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
// Copy-paste from https://github.com/jfromaniello/mac-ca
// Babel does not want to transform https://github.com/jfromaniello/mac-ca/blob/fb2b2824c91e3c7f7ffdc8329dd8992e172b967b/lib/formatter.js#L2 because "package" is a reserved word
// It is easier to copy the package then add ye another babel transform to change the reserved word on the fly
const https_1 = __importDefault(require("https"));
const node_forge_1 = __importDefault(require("node-forge"));
const validFormats = {
    der: 0,
    pem: 1,
    txt: 2,
    asn1: 3,
};
function myASN(pem) {
    const der = node_forge_1.default.pki.pemToDer(pem);
    const asn1 = node_forge_1.default.asn1;
    // @ts-expect-error
    let crt = asn1.fromDer(der.data.toString('binary')).value[0].value;
    const serial = crt[0];
    const hasSerial = serial.tagClass === asn1.Class.CONTEXT_SPECIFIC &&
        serial.type === 0 &&
        serial.constructed;
    crt = crt.slice(hasSerial);
    return {
        serial: crt[0],
        issuer: crt[2],
        valid: crt[3],
        subject: crt[4],
    };
}
function txtFormat(pem) {
    const crt = myASN(pem);
    const d = new Date();
    return `Subject\t${crt.subject.value
        .map((rdn) => rdn.value[0].value[1].value)
        .join('/')}
Valid\t${crt.valid.value.map((date) => date.value).join(' - ')}
Saved\t${d.toLocaleDateString()} ${d
        .toTimeString()
        .replace(/\s*\(.*\)\s*/, '')} by mac-ca
${pem}`;
}
const transform = function (format) {
    return function (pem) {
        try {
            switch (format) {
                case validFormats.der:
                    return node_forge_1.default.pki.pemToDer(pem);
                case validFormats.pem:
                    return pem;
                case validFormats.txt:
                    return txtFormat(pem);
                case validFormats.asn1:
                    return myASN(pem);
                default:
                    return node_forge_1.default.pki.certificateFromPem(pem);
            }
        }
        catch (er) {
            return;
        }
    };
};
if (process.platform !== 'darwin') {
    module.exports.all = () => [];
    module.exports.each = () => { };
}
else {
    const child_process = require('child_process');
    const splitPattern = /(?=-----BEGIN\sCERTIFICATE-----)/g;
    const systemRootCertsPath = '/System/Library/Keychains/SystemRootCertificates.keychain';
    const args = ['find-certificate', '-a', '-p'];
    // eslint-disable-next-line node/no-sync
    const allTrusted = child_process
        .spawnSync('/usr/bin/security', args)
        .stdout.toString()
        .split(splitPattern);
    // eslint-disable-next-line node/no-sync
    const allRoot = child_process
        .spawnSync('/usr/bin/security', args.concat(systemRootCertsPath))
        .stdout.toString()
        .split(splitPattern);
    https_1.default.globalAgent.options.ca = https_1.default.globalAgent.options.ca || [];
    const ca = https_1.default.globalAgent.options.ca;
    function duplicated(cert, index, arr) {
        return arr.indexOf(cert) === index;
    }
    const all = allTrusted.concat(allRoot);
    all.filter(duplicated).forEach((cert) => ca.push(cert));
    module.exports.der2 = validFormats;
    module.exports.all = function (format) {
        return all.map(transform(format)).filter((c) => c);
    };
    module.exports.each = function (format, callback) {
        if (typeof format === 'function') {
            callback = format;
            format = undefined;
        }
        return all
            .map(transform(format))
            .filter((c) => c)
            .forEach(callback);
    };
}
//# sourceMappingURL=macCa.js.map