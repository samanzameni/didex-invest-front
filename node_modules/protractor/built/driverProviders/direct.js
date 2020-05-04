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
 *  This is an implementation of the Direct Driver Provider.
 *  It is responsible for setting up the account object, tearing
 *  it down, and setting up the driver correctly.
 */
const fs = require("fs");
const selenium_webdriver_1 = require("selenium-webdriver");
const chrome_1 = require("selenium-webdriver/chrome");
const firefox_1 = require("selenium-webdriver/firefox");
const webdriver_manager_1 = require("webdriver-manager");
const exitCodes_1 = require("../exitCodes");
const logger_1 = require("../logger");
const driverProvider_1 = require("./driverProvider");
let logger = new logger_1.Logger('direct');
class Direct extends driverProvider_1.DriverProvider {
    constructor(config) {
        super(config);
    }
    /**
     * Configure and launch (if applicable) the object's environment.
     * @return {Promise} A promise which will resolve when the environment is
     *     ready to test.
     */
    setupDriverEnv() {
        return __awaiter(this, void 0, void 0, function* () {
            switch (this.config_.capabilities.browserName) {
                case 'chrome':
                    logger.info('Using ChromeDriver directly...');
                    break;
                case 'firefox':
                    logger.info('Using FirefoxDriver directly...');
                    break;
                default:
                    throw new exitCodes_1.BrowserError(logger, 'browserName ' + this.config_.capabilities.browserName +
                        ' is not supported with directConnect.');
            }
        });
    }
    /**
     * Create a new driver.
     *
     * @public
     * @override
     * @return webdriver instance
     */
    getNewDriver() {
        return __awaiter(this, void 0, void 0, function* () {
            let driver;
            switch (this.config_.capabilities.browserName) {
                case 'chrome':
                    let chromeDriverFile;
                    if (this.config_.chromeDriver) {
                        chromeDriverFile = this.config_.chromeDriver;
                    }
                    else {
                        try {
                            chromeDriverFile = new webdriver_manager_1.ChromeDriver().getBinaryPath();
                        }
                        catch (e) {
                            throw new exitCodes_1.BrowserError(logger, 'Run \'webdriver-manager update\' to download binaries.');
                        }
                    }
                    if (!fs.existsSync(chromeDriverFile)) {
                        throw new exitCodes_1.BrowserError(logger, 'Could not find chromedriver at ' + chromeDriverFile +
                            '. Run \'webdriver-manager update\' to download binaries.');
                    }
                    const chromeService = new chrome_1.ServiceBuilder(chromeDriverFile).build();
                    driver = yield chrome_1.Driver.createSession(new selenium_webdriver_1.Capabilities(this.config_.capabilities), chromeService);
                    break;
                case 'firefox':
                    let geckoDriverFile;
                    if (this.config_.geckoDriver) {
                        geckoDriverFile = this.config_.geckoDriver;
                    }
                    else {
                        try {
                            geckoDriverFile = new webdriver_manager_1.GeckoDriver().getBinaryPath();
                        }
                        catch (e) {
                            throw new exitCodes_1.BrowserError(logger, 'Run \'webdriver-manager update\' to download binaries.');
                        }
                    }
                    if (!fs.existsSync(geckoDriverFile)) {
                        throw new exitCodes_1.BrowserError(logger, 'Could not find geckodriver at ' + geckoDriverFile +
                            '. Run \'webdriver-manager update\' to download binaries.');
                    }
                    let firefoxService = new firefox_1.ServiceBuilder(geckoDriverFile).build();
                    driver = yield firefox_1.Driver.createSession(new selenium_webdriver_1.Capabilities(this.config_.capabilities), firefoxService);
                    break;
                default:
                    throw new exitCodes_1.BrowserError(logger, 'browserName ' + this.config_.capabilities.browserName +
                        ' is not supported with directConnect.');
            }
            this.drivers_.push(driver);
            return driver;
        });
    }
}
exports.Direct = Direct;
//# sourceMappingURL=direct.js.map