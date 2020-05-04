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
/*
 * This is an implementation of the Local Driver Provider.
 * It is responsible for setting up the account object, tearing
 * it down, and setting up the driver correctly.
 *
 * TODO - it would be nice to do this in the launcher phase,
 * so that we only start the local selenium once per entire launch.
 */
const fs = require("fs");
const remote_1 = require("selenium-webdriver/remote");
const webdriver_manager_1 = require("webdriver-manager");
const exitCodes_1 = require("../exitCodes");
const logger_1 = require("../logger");
const driverProvider_1 = require("./driverProvider");
let logger = new logger_1.Logger('local');
class Local extends driverProvider_1.DriverProvider {
    constructor(config) {
        super(config);
        this.server_ = null;
    }
    /**
     * Helper to locate the default jar path if none is provided by the user.
     * @private
     */
    addDefaultBinaryLocs_() {
        if (!this.config_.seleniumServerJar) {
            logger.debug('Attempting to find the SeleniumServerJar in the default ' +
                'location used by webdriver-manager');
            try {
                this.config_.seleniumServerJar = new webdriver_manager_1.SeleniumServer().getBinaryPath();
            }
            catch (err) {
                throw new exitCodes_1.BrowserError(logger, 'Run \'webdriver-manager update\' to download binaries.');
            }
        }
        if (!fs.existsSync(this.config_.seleniumServerJar)) {
            throw new exitCodes_1.BrowserError(logger, 'No selenium server jar found at ' + this.config_.seleniumServerJar +
                '. Run \'webdriver-manager update\' to download binaries.');
        }
        if (this.config_.capabilities.browserName === 'chrome') {
            if (!this.config_.chromeDriver) {
                logger.debug('Attempting to find the chromedriver binary in the default ' +
                    'location used by webdriver-manager');
                try {
                    this.config_.chromeDriver = new webdriver_manager_1.ChromeDriver().getBinaryPath();
                }
                catch (err) {
                    throw new exitCodes_1.BrowserError(logger, 'Run \'webdriver-manager update\' to download binaries.');
                }
            }
            // Check if file exists, if not try .exe or fail accordingly
            if (!fs.existsSync(this.config_.chromeDriver)) {
                if (fs.existsSync(this.config_.chromeDriver + '.exe')) {
                    this.config_.chromeDriver += '.exe';
                }
                else {
                    throw new exitCodes_1.BrowserError(logger, 'Could not find chromedriver at ' + this.config_.chromeDriver +
                        '. Run \'webdriver-manager update\' to download binaries.');
                }
            }
        }
        if (this.config_.capabilities.browserName === 'firefox') {
            if (!this.config_.geckoDriver) {
                logger.debug('Attempting to find the gecko driver binary in the default ' +
                    'location used by webdriver-manager');
                try {
                    this.config_.geckoDriver = new webdriver_manager_1.GeckoDriver().getBinaryPath();
                }
                catch (err) {
                    throw new exitCodes_1.BrowserError(logger, 'Run \'webdriver-manager update\' to download binaries.');
                }
            }
            // Check if file exists, if not try .exe or fail accordingly
            if (!fs.existsSync(this.config_.geckoDriver)) {
                if (fs.existsSync(this.config_.geckoDriver + '.exe')) {
                    this.config_.geckoDriver += '.exe';
                }
                else {
                    throw new exitCodes_1.BrowserError(logger, 'Could not find gecko driver at ' + this.config_.geckoDriver +
                        '. Run \'webdriver-manager update\' to download binaries.');
                }
            }
        }
    }
    /**
     * Configure and launch (if applicable) the object's environment.
     * @public
     * @return {Promise} A promise which will resolve when the environment is
     *     ready to test.
     */
    setupDriverEnv() {
        return __awaiter(this, void 0, void 0, function* () {
            this.addDefaultBinaryLocs_();
            logger.info('Starting selenium standalone server...');
            let serverConf = this.config_.localSeleniumStandaloneOpts || {};
            // If args or port is not set use seleniumArgs and seleniumPort
            // for backward compatibility
            if (serverConf.args === undefined) {
                serverConf.args = this.config_.seleniumArgs || [];
            }
            if (serverConf.jvmArgs === undefined) {
                serverConf.jvmArgs = this.config_.jvmArgs || [];
            }
            else {
                if (!Array.isArray(serverConf.jvmArgs)) {
                    throw new exitCodes_1.ConfigError(logger, 'jvmArgs should be an array.');
                }
            }
            if (serverConf.port === undefined) {
                serverConf.port = this.config_.seleniumPort;
            }
            // configure server
            if (this.config_.chromeDriver) {
                serverConf.jvmArgs.push('-Dwebdriver.chrome.driver=' + this.config_.chromeDriver);
            }
            if (this.config_.geckoDriver) {
                serverConf.jvmArgs.push('-Dwebdriver.gecko.driver=' + this.config_.geckoDriver);
            }
            this.server_ = new remote_1.SeleniumServer(this.config_.seleniumServerJar, serverConf);
            // start local server, grab hosted address, and resolve promise
            const url = yield this.server_.start(this.config_.seleniumServerStartTimeout);
            logger.info('Selenium standalone server started at ' + url);
            const address = yield this.server_.address();
            this.config_.seleniumAddress = address;
        });
    }
}
exports.Local = Local;
//# sourceMappingURL=local.js.map