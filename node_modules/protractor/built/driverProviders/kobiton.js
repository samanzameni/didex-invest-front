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
const logger_1 = require("../logger");
const driverProvider_1 = require("./driverProvider");
let logger = new logger_1.Logger('kobiton');
class Kobiton extends driverProvider_1.DriverProvider {
    constructor(config) {
        super(config);
    }
    /**
     * Configure and launch (if applicable) the object's environment.
     * @return {Promise} A promise which will resolve when the environment is
     *      ready to test.
     */
    setupDriverEnv() {
        return __awaiter(this, void 0, void 0, function* () {
            this.config_.capabilities['kobitonUser'] = this.config_.kobitonUser;
            this.config_.capabilities['kobitonKey'] = this.config_.kobitonKey;
            this.config_.seleniumAddress = 'https://' + this.config_.kobitonUser + ':' +
                this.config_.kobitonKey + '@api.kobiton.com/wd/hub';
            logger.info('Using Kobiton selenium server at ' + this.config_.seleniumAddress);
        });
    }
}
exports.Kobiton = Kobiton;
//# sourceMappingURL=kobiton.js.map