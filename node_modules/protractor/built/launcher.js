"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * The launcher is responsible for parsing the capabilities from the
 * input configuration and launching test runners.
 */
const fs = require("fs");
const configParser_1 = require("./configParser");
const exitCodes_1 = require("./exitCodes");
const logger_1 = require("./logger");
const taskRunner_1 = require("./taskRunner");
const taskScheduler_1 = require("./taskScheduler");
const util_1 = require("./util");
let logger = new logger_1.Logger('launcher');
let RUNNERS_FAILED_EXIT_CODE = 100;
/**
 * Keeps track of a list of task results. Provides method to add a new
 * result, aggregate the results into a summary, count failures,
 * and save results into a JSON file.
 */
class TaskResults {
    constructor() {
        // TODO: set a type for result
        this.results_ = [];
    }
    add(result) {
        this.results_.push(result);
    }
    totalSpecFailures() {
        return this.results_.reduce((specFailures, result) => {
            return specFailures + result.failedCount;
        }, 0);
    }
    totalProcessFailures() {
        return this.results_.reduce((processFailures, result) => {
            return !result.failedCount && result.exitCode !== 0 ? processFailures + 1 : processFailures;
        }, 0);
    }
    saveResults(filepath) {
        let jsonOutput = this.results_.reduce((jsonOutput, result) => {
            return jsonOutput.concat(result.specResults);
        }, []);
        let json = JSON.stringify(jsonOutput, null, '  ');
        fs.writeFileSync(filepath, json);
    }
    reportSummary() {
        let specFailures = this.totalSpecFailures();
        let processFailures = this.totalProcessFailures();
        this.results_.forEach((result) => {
            let capabilities = result.capabilities;
            let shortName = (capabilities.browserName) ? capabilities.browserName : '';
            shortName = (capabilities.logName) ?
                capabilities.logName :
                (capabilities.browserName) ? capabilities.browserName : '';
            shortName += (capabilities.version) ? capabilities.version : '';
            shortName += (capabilities.logName && capabilities.count < 2) ? '' : ' #' + result.taskId;
            if (result.failedCount) {
                logger.info(shortName + ' failed ' + result.failedCount + ' test(s)');
            }
            else if (result.exitCode !== 0) {
                logger.info(shortName + ' failed with exit code: ' + result.exitCode);
            }
            else {
                logger.info(shortName + ' passed');
            }
        });
        if (specFailures && processFailures) {
            logger.info('overall: ' + specFailures + ' failed spec(s) and ' + processFailures +
                ' process(es) failed to complete');
        }
        else if (specFailures) {
            logger.info('overall: ' + specFailures + ' failed spec(s)');
        }
        else if (processFailures) {
            logger.info('overall: ' + processFailures + ' process(es) failed to complete');
        }
    }
}
let taskResults_ = new TaskResults();
/**
 * Initialize and run the tests.
 * Exits with 1 on test failure, and RUNNERS_FAILED_EXIT_CODE on unexpected
 * failures.
 *
 * @param {string=} configFile
 * @param {Object=} additionalConfig
 */
let initFn = function (configFile, additionalConfig) {
    return __awaiter(this, void 0, void 0, function* () {
        let configParser = new configParser_1.ConfigParser();
        if (configFile) {
            configParser.addFileConfig(configFile);
        }
        if (additionalConfig) {
            configParser.addConfig(additionalConfig);
        }
        let config = configParser.getConfig();
        logger_1.Logger.set(config);
        logger.debug('Running with --troubleshoot');
        logger.debug('Protractor version: ' + require('../package.json').version);
        logger.debug('Your base url for tests is ' + config.baseUrl);
        // Run beforeLaunch
        yield util_1.runFilenameOrFn_(config.configDir, config.beforeLaunch);
        // 1) If getMultiCapabilities is set, resolve that as
        // `multiCapabilities`.
        if (config.getMultiCapabilities && typeof config.getMultiCapabilities === 'function') {
            if (config.multiCapabilities.length || config.capabilities) {
                logger.warn('getMultiCapabilities() will override both capabilities ' +
                    'and multiCapabilities');
            }
            // If getMultiCapabilities is defined and a function, use this.
            const waitMultiConfig = yield config.getMultiCapabilities();
            config.multiCapabilities = waitMultiConfig;
            config.capabilities = null;
        }
        // 2) Set `multicapabilities` using `capabilities`,
        // `multicapabilities`, or default
        if (config.capabilities) {
            if (config.multiCapabilities.length) {
                logger.warn('You have specified both capabilities and ' +
                    'multiCapabilities. This will result in capabilities being ' +
                    'ignored');
            }
            else {
                // Use capabilities if multiCapabilities is empty.
                config.multiCapabilities = [config.capabilities];
            }
        }
        else if (!config.multiCapabilities.length) {
            // Default to chrome if no capabilities given
            config.multiCapabilities = [{ browserName: 'chrome' }];
        }
        // 3) If we're in `elementExplorer` mode, throw an error and exit.
        if (config.elementExplorer || config.framework === 'explorer') {
            const err = new Error('Deprecated: Element explorer depends on the ' +
                'WebDriver control flow, and thus is no longer supported.');
            logger.error(err);
            process.exit(1);
        }
        // 4) Run tests.
        let scheduler = new taskScheduler_1.TaskScheduler(config);
        process.on('uncaughtException', (exc) => {
            let e = (exc instanceof Error) ? exc : new Error(exc);
            if (config.ignoreUncaughtExceptions) {
                // This can be a sign of a bug in the test framework, that it may
                // not be handling WebDriver errors properly. However, we don't
                // want these errors to prevent running the tests.
                logger.warn('Ignoring uncaught error ' + exc);
                return;
            }
            logger.error(e.message);
            logger.error(e.stack);
            if (e instanceof exitCodes_1.ProtractorError) {
                let protractorError = e;
                process.exit(protractorError.code);
            }
            else {
                process.exit(1);
            }
        });
        process.on('unhandledRejection', (reason, p) => {
            if (reason.stack.match('angular testability are undefined') ||
                reason.stack.match('angular is not defined')) {
                logger.warn('Unhandled promise rejection error: This is usually occurs ' +
                    'when a browser.get call is made and a previous async call was ' +
                    'not awaited');
            }
            logger.warn(p);
        });
        process.on('exit', (code) => {
            if (code) {
                logger.error('Process exited with error code ' + code);
            }
            else if (scheduler.numTasksOutstanding() > 0) {
                logger.error('BUG: launcher exited with ' + scheduler.numTasksOutstanding() + ' tasks remaining');
                process.exit(RUNNERS_FAILED_EXIT_CODE);
            }
        });
        // Run afterlaunch and exit
        const cleanUpAndExit = (exitCode) => __awaiter(this, void 0, void 0, function* () {
            try {
                const returned = yield util_1.runFilenameOrFn_(config.configDir, config.afterLaunch, [exitCode]);
                if (typeof returned === 'number') {
                    process.exit(returned);
                }
                else {
                    process.exit(exitCode);
                }
            }
            catch (err) {
                logger.error('Error:', err);
                process.exit(1);
            }
        });
        const totalTasks = scheduler.numTasksOutstanding();
        let forkProcess = false;
        if (totalTasks > 1) { // Start new processes only if there are >1 tasks.
            forkProcess = true;
            if (config.debug) {
                throw new exitCodes_1.ConfigError(logger, 'Cannot run in debug mode with multiCapabilities, count > 1, or sharding');
            }
        }
        const createNextTaskRunner = () => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
                const task = scheduler.nextTask();
                if (task) {
                    const taskRunner = new taskRunner_1.TaskRunner(configFile, additionalConfig, task, forkProcess);
                    try {
                        const result = yield taskRunner.run();
                        if (result.exitCode && !result.failedCount) {
                            logger.error('Runner process exited unexpectedly with error code: ' + result.exitCode);
                        }
                        taskResults_.add(result);
                        task.done();
                        yield createNextTaskRunner();
                        // If all tasks are finished
                        if (scheduler.numTasksOutstanding() === 0) {
                            resolve();
                        }
                        logger.info(scheduler.countActiveTasks() + ' instance(s) of WebDriver still running');
                    }
                    catch (err) {
                        const errorCode = exitCodes_1.ErrorHandler.parseError(err);
                        logger.error('Error:', err.stack || err.message || err);
                        yield cleanUpAndExit(errorCode ? errorCode : RUNNERS_FAILED_EXIT_CODE);
                    }
                }
                else {
                    resolve();
                }
            }));
        });
        const maxConcurrentTasks = scheduler.maxConcurrentTasks();
        for (let i = 0; i < maxConcurrentTasks; ++i) {
            yield createNextTaskRunner();
        }
        logger.info('Running ' + scheduler.countActiveTasks() + ' instances of WebDriver');
        // By now all runners have completed.
        // Save results if desired
        if (config.resultJsonOutputFile) {
            taskResults_.saveResults(config.resultJsonOutputFile);
        }
        taskResults_.reportSummary();
        let exitCode = 0;
        if (taskResults_.totalProcessFailures() > 0) {
            exitCode = RUNNERS_FAILED_EXIT_CODE;
        }
        else if (taskResults_.totalSpecFailures() > 0) {
            exitCode = 1;
        }
        yield cleanUpAndExit(exitCode);
        // Start `const maxConcurrentTasks` workers for handling tasks in
        // the beginning. As a worker finishes a task, it will pick up the next
        // task from the scheduler's queue until all tasks are gone.
    });
};
exports.init = initFn;
//# sourceMappingURL=launcher.js.map