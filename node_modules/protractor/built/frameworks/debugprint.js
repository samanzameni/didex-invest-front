"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util = require("util");
const logger_1 = require("../logger");
const logger = new logger_1.Logger('debugger');
/**
 * A debug framework which does not actually run any tests, just spits
 * out the list that would be run.
 *
 * @param {Runner} runner The current Protractor Runner.
 * @param {Array} specs Array of Directory Path Strings.
 * @return {Promise} Promise resolved with the test results
 */
exports.run = (runner, specs) => {
    return new Promise(resolve => {
        logger.info(`Resolved spec files: ${util.inspect(specs)}`);
        resolve({ failedCount: 0 });
    });
};
//# sourceMappingURL=debugprint.js.map