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
const path = require("path");
const webdriver = require("selenium-webdriver");
let STACK_SUBSTRINGS_TO_FILTER = [
    'node_modules/jasmine/', 'node_modules/selenium-webdriver', 'at Module.', 'at Object.Module.',
    'at Function.Module', '(timers.js:', 'protractor/lib/'
];
/**
 * Utility function that filters a stack trace to be more readable. It removes
 * Jasmine test frames and webdriver promise resolution.
 * @param {string} text Original stack trace.
 * @return {string}
 */
function filterStackTrace(text) {
    if (!text) {
        return text;
    }
    let lines = text.split(/\n/).filter((line) => {
        for (let filter of STACK_SUBSTRINGS_TO_FILTER) {
            if (line.indexOf(filter) !== -1) {
                return false;
            }
        }
        return true;
    });
    return lines.join('\n');
}
exports.filterStackTrace = filterStackTrace;
/**
 * Internal helper for abstraction of polymorphic filenameOrFn properties.
 * @param {object} filenameOrFn The filename or function that we will execute.
 * @param {Array.<object>}} args The args to pass into filenameOrFn.
 * @return {Promise} A promise that will resolve when filenameOrFn completes.
 */
function runFilenameOrFn_(configDir, filenameOrFn, args) {
    return __awaiter(this, void 0, void 0, function* () {
        if (filenameOrFn && !(typeof filenameOrFn === 'string' || typeof filenameOrFn === 'function')) {
            throw new Error('filenameOrFn must be a string or function');
        }
        if (typeof filenameOrFn === 'string') {
            filenameOrFn = require(path.resolve(configDir, filenameOrFn));
        }
        if (typeof filenameOrFn === 'function') {
            let results;
            try {
                results = yield filenameOrFn.apply(null, args);
            }
            catch (err) {
                if (typeof err === 'string') {
                    err = new Error(err);
                }
                else {
                    err = err;
                    if (!err.stack) {
                        err.stack = new Error().stack;
                    }
                }
                err.stack = exports.filterStackTrace(err.stack);
                throw err;
            }
            return results;
        }
        else {
            return undefined;
        }
    });
}
exports.runFilenameOrFn_ = runFilenameOrFn_;
/**
 * Joins two logs of test results, each following the format of <framework>.run
 * @param {object} log1
 * @param {object} log2
 * @return {object} The joined log
 */
function joinTestLogs(log1, log2) {
    return {
        failedCount: log1.failedCount + log2.failedCount,
        specResults: (log1.specResults || []).concat(log2.specResults || [])
    };
}
exports.joinTestLogs = joinTestLogs;
/**
 * Returns false if an error indicates a missing or stale element, re-throws
 * the error otherwise
 *
 * @param {*} The error to check
 * @throws {*} The error it was passed if it doesn't indicate a missing or stale
 *   element
 * @return {boolean} false, if it doesn't re-throw the error
 */
function falseIfMissing(error) {
    if ((error instanceof webdriver.error.NoSuchElementError) ||
        (error instanceof webdriver.error.StaleElementReferenceError)) {
        return false;
    }
    else {
        throw error;
    }
}
exports.falseIfMissing = falseIfMissing;
/**
 * Return a boolean given boolean value.
 *
 * @param {boolean} value
 * @returns {boolean} given value
 */
function passBoolean(value) {
    return value;
}
exports.passBoolean = passBoolean;
//# sourceMappingURL=util.js.map