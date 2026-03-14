"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.safeJsonParse = safeJsonParse;
exports.tryParseJson = tryParseJson;
exports.gatherStringValues = gatherStringValues;
exports.normalizeMetadata = normalizeMetadata;
const string_utils_1 = require("./string-utils");
function safeJsonParse(value) {
    if (!value)
        return null;
    const cleaned = (0, string_utils_1.stripCodeFence)(value);
    if (!cleaned)
        return null;
    try {
        return JSON.parse(cleaned);
    }
    catch (_error) {
        return null;
    }
}
function tryParseJson(text) {
    return safeJsonParse(text);
}
function gatherStringValues(value) {
    if (!value)
        return [];
    if (typeof value === 'string')
        return [value];
    if (Array.isArray(value))
        return value.flatMap(gatherStringValues);
    if (typeof value === 'object') {
        return Object.values(value).flatMap(gatherStringValues);
    }
    return [];
}
function normalizeMetadata(metadata) {
    if (metadata === null || metadata === undefined || metadata === '')
        return null;
    if (typeof metadata === 'object') {
        return metadata;
    }
    if (typeof metadata === 'string') {
        const parsed = safeJsonParse(metadata);
        if (parsed && typeof parsed === 'object')
            return parsed;
        return { raw_metadata: metadata };
    }
    return null;
}
