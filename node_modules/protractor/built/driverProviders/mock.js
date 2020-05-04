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
 * This is an mock implementation of the Driver Provider.
 * It returns a fake webdriver and never actually contacts a selenium
 * server.
 */
const selenium_webdriver_1 = require("selenium-webdriver");
const driverProvider_1 = require("./driverProvider");
class MockExecutor {
    execute(_) { }
}
exports.MockExecutor = MockExecutor;
class Mock extends driverProvider_1.DriverProvider {
    constructor(config) {
        super(config);
    }
    /**
     * An execute function that returns a promise with a test value.
     */
    execute() {
        return __awaiter(this, void 0, void 0, function* () {
            return { value: 'test_response' };
        });
    }
    /**
     * Configure and launch (if applicable) the object's environment.
     * @public
     * @return {Promise} A promise which will resolve immediately.
     */
    setupDriverEnv() {
        return __awaiter(this, void 0, void 0, function* () { });
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
            const mockSession = new selenium_webdriver_1.Session('test_session_id', {});
            const newDriver = new selenium_webdriver_1.WebDriver(mockSession, new MockExecutor());
            this.drivers_.push(newDriver);
            return newDriver;
        });
    }
}
exports.Mock = Mock;
//# sourceMappingURL=mock.js.map