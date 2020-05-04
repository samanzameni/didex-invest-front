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
 *  This is a base driver provider class.
 *  It is responsible for setting up the account object, tearing
 *  it down, and setting up the driver correctly.
 */
const selenium_webdriver_1 = require("selenium-webdriver");
const bpRunner_1 = require("../bpRunner");
const exitCodes_1 = require("../exitCodes");
const logger_1 = require("../logger");
let logger = new logger_1.Logger('driverProvider');
class DriverProvider {
    constructor(config) {
        this.config_ = config;
        this.drivers_ = [];
        this.bpRunner = new bpRunner_1.BlockingProxyRunner(config);
    }
    /**
     * Get all existing drivers.
     *
     * @public
     * @return array of webdriver instances
     */
    getExistingDrivers() {
        return this.drivers_.slice(); // Create a shallow copy
    }
    getBPUrl() {
        if (this.config_.blockingProxyUrl) {
            return this.config_.blockingProxyUrl;
        }
        return `http://localhost:${this.bpRunner.port}`;
    }
    /**
     * Create a new driver.
     *
     * @public
     * @return a promise to a webdriver instance
     */
    getNewDriver() {
        return __awaiter(this, void 0, void 0, function* () {
            let builder;
            if (this.config_.useBlockingProxy) {
                builder =
                    new selenium_webdriver_1.Builder().usingServer(this.getBPUrl()).withCapabilities(this.config_.capabilities);
            }
            else {
                builder = new selenium_webdriver_1.Builder()
                    .usingServer(this.config_.seleniumAddress)
                    .usingWebDriverProxy(this.config_.webDriverProxy)
                    .withCapabilities(this.config_.capabilities);
            }
            if (this.config_.disableEnvironmentOverrides === true) {
                builder.disableEnvironmentOverrides();
            }
            let newDriver;
            try {
                newDriver = yield builder.build();
            }
            catch (e) {
                throw new exitCodes_1.BrowserError(logger, e.message);
            }
            this.drivers_.push(newDriver);
            return newDriver;
        });
    }
    /**
     * Quit a driver.
     *
     * @public
     * @param webdriver instance
     */
    quitDriver(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            let driverIndex = this.drivers_.indexOf(driver);
            if (driverIndex >= 0) {
                this.drivers_.splice(driverIndex, 1);
                try {
                    yield driver.close();
                    yield driver.quit();
                }
                catch (err) {
                    // This happens when Protractor keeps track of all the webdrivers
                    // created and calls quit. If a user calls driver.quit, then this will
                    // throw an error. This catch will swallow the error.
                }
            }
        });
    }
    /**
     * Quits an array of drivers and returns a q promise instead of a webdriver one
     *
     * @param drivers {webdriver.WebDriver[]} The webdriver instances
     */
    static quitDrivers(provider, drivers) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Promise.all(drivers.map((driver) => {
                return provider.quitDriver(driver);
            }));
        });
    }
    /**
     * Default update job method.
     * @return a promise
     */
    updateJob(update) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    /**
     * Default setup environment method, common to all driver providers.
     */
    setupEnv() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.setupDriverEnv();
            if (this.config_.useBlockingProxy && !this.config_.blockingProxyUrl) {
                yield this.bpRunner.start();
            }
        });
    }
    /**
     * Teardown and destroy the environment and do any associated cleanup.
     * Shuts down the drivers.
     *
     * @public
     * @return {Promise<any>} A promise which will resolve when the environment is down.
     */
    teardownEnv() {
        return __awaiter(this, void 0, void 0, function* () {
            yield DriverProvider.quitDrivers(this, this.drivers_);
        });
    }
}
exports.DriverProvider = DriverProvider;
//# sourceMappingURL=driverProvider.js.map