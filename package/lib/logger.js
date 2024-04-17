"use strict";
/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeLogger = exports.loggerOutputFile = void 0;
const path_1 = __importDefault(require("path"));
const flipper_common_1 = require("flipper-common");
// @ts-expect-error
const file_stream_rotator_1 = __importDefault(require("file-stream-rotator"));
const fs_extra_1 = require("fs-extra");
const promises_1 = require("fs/promises");
const fs_1 = require("fs");
const Logger_1 = require("./fb-stubs/Logger");
const processExit_1 = require("./utils/processExit");
exports.loggerOutputFile = 'flipper-server-log.out';
async function initializeLogger(environmentInfo, staticDir) {
    // Suppress stdout debug messages, but keep writing them to the file.
    console.debug = function () { };
    const logger = (0, Logger_1.initializeLogger)(environmentInfo);
    (0, flipper_common_1.setLoggerInstance)(logger);
    const logFilename = path_1.default.join(staticDir, exports.loggerOutputFile);
    let logStream = undefined;
    try {
        await (0, fs_extra_1.ensureFile)(logFilename);
        await (0, promises_1.access)(logFilename, fs_1.constants.W_OK);
        logStream = file_stream_rotator_1.default.getStream({
            // Rotation number is going to be added after the file name
            filename: logFilename,
            // Rotate every 1MB
            size: '1m',
            // Keep last 5 rotations
            max_logs: 20,
        });
    }
    catch (e) {
        console.warn('initializeLogger -> cannot write logs to FS', e);
    }
    (0, flipper_common_1.addLogTailer)((level, ...data) => {
        const logInfo = (0, flipper_common_1.LoggerFormat)(level, ...data);
        logStream?.write(`[${logInfo.time}][${logInfo.type}] ${logInfo.msg}\n`);
        if (level === 'error') {
            const { error: { stack, name }, } = (0, flipper_common_1.LoggerExtractError)(data);
            logStream?.write(`${name}: \n${stack}\n`);
        }
    });
    const finalizeLogger = async () => {
        const logStreamToEnd = logStream;
        // Prevent future writes
        logStream = undefined;
        await new Promise((resolve) => {
            logStreamToEnd?.end(resolve);
        });
    };
    (0, processExit_1.setProcessExitRoutine)(finalizeLogger);
}
exports.initializeLogger = initializeLogger;
//# sourceMappingURL=logger.js.map