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
const util = require("util");
const exitCodes_1 = require("../exitCodes");
const logger_1 = require("../logger");
const driverProvider_1 = require("./driverProvider");
const BrowserstackClient = require('browserstack');
let logger = new logger_1.Logger('browserstack');
class BrowserStack extends driverProvider_1.DriverProvider {
    constructor(config) {
        super(config);
    }
    /**
     * Hook to update the BrowserStack job status.
     * @public
     * @param {Object} update
     * @return {Promise} A promise that will resolve when the update is complete.
     */
    updateJob(update) {
        return __awaiter(this, void 0, void 0, function* () {
            let mappedDrivers = this.drivers_.map((driver) => __awaiter(this, void 0, void 0, function* () {
                let session = yield driver.getSession();
                // Fetching BrowserStack session details.
                this.browserstackClient.getSession(session.getId(), function (error, automate_session) {
                    if (error) {
                        logger.info('BrowserStack results available at ' +
                            'https://www.browserstack.com/automate');
                    }
                    else {
                        if (automate_session && automate_session.browser_url) {
                            logger.info('BrowserStack results available at ' + automate_session.browser_url);
                        }
                        else {
                            logger.info('BrowserStack results available at ' +
                                'https://www.browserstack.com/automate');
                        }
                    }
                });
                let jobStatus = update.passed ? 'completed' : 'error';
                let statusObj = { status: jobStatus };
                // Updating status of BrowserStack session.
                this.browserstackClient.updateSession(session.getId(), statusObj, function (error, automate_session) {
                    if (error) {
                        throw new exitCodes_1.BrowserError(logger, 'Error updating BrowserStack pass/fail status: ' + util.inspect(error));
                    }
                    else {
                        logger.info(automate_session);
                    }
                });
            }));
            return Promise.all(mappedDrivers);
        });
    }
    /**
     * Configure and launch (if applicable) the object's environment.
     * @return {promise} A promise which will resolve when the environment is
     *     ready to test.
     */
    setupDriverEnv() {
        return __awaiter(this, void 0, void 0, function* () {
            this.config_.capabilities['browserstack.user'] = this.config_.browserstackUser;
            this.config_.capabilities['browserstack.key'] = this.config_.browserstackKey;
            this.config_.seleniumAddress = 'http://hub.browserstack.com/wd/hub';
            this.browserstackClient = BrowserstackClient.createAutomateClient({
                username: this.config_.browserstackUser,
                password: this.config_.browserstackKey,
                proxy: this.config_.browserstackProxy
            });
            // Append filename to capabilities.name so that it's easier to identify
            // tests.
            if (this.config_.capabilities.name && this.config_.capabilities.shardTestFiles) {
                this.config_.capabilities.name +=
                    (':' + this.config_.specs.toString().replace(/^.*[\\\/]/, ''));
            }
            logger.info(`Using BrowserStack selenium server at ${this.config_.seleniumAddress}`);
        });
    }
}
exports.BrowserStack = BrowserStack;
//# sourceMappingURL=browserStack.js.map