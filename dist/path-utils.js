"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeBucketPathPrefix = normalizeBucketPathPrefix;
const lodash_1 = require("lodash");
function normalizeBucketPathPrefix(bucketPathPrefix) {
    return (0, lodash_1.trimEnd)(String(bucketPathPrefix || ''), '/');
}
