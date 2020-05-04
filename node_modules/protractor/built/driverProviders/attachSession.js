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
 *  This is an implementation of the Attach Session Driver Provider.
 *  It is responsible for setting up the account object, tearing
 *  it down, and setting up the driver correctly.
 */
const selenium_webdriver_1 = require("selenium-webdriver");
const http_1 = require("selenium-webdriver/http");
const logger_1 = require("../logger");
const driverProvider_1 = require("./driverProvider");
let logger = new logger_1.Logger('attachSession');
class AttachSession extends driverProvider_1.DriverProvider {
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
            logger.info('Using the selenium server at ' + this.config_.seleniumAddress);
            logger.info('Using session id - ' + this.config_.seleniumSessionId);
        });
    }
    /**
     * Getting a new driver by attaching an existing session.
     *
     * @public
     * @return {WebDriver} webdriver instance
     */
    getNewDriver() {
        return __awaiter(this, void 0, void 0, function* () {
            const httpClient = new http_1.HttpClient(this.config_.seleniumAddress);
            const executor = new http_1.Executor(httpClient);
            const session = new selenium_webdriver_1.Session(this.config_.seleniumSessionId, null);
            const newDriver = new selenium_webdriver_1.WebDriver(session, executor);
            this.drivers_.push(newDriver);
            return newDriver;
        });
    }
    /**
     * Maintains the existing session and does not quit the driver.
     *
     * @public
     */
    quitDriver() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
}
exports.AttachSession = AttachSession;
//# sourceMappingURL=attachSession.js.map