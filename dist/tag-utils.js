"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toSlug = toSlug;
exports.normalizeTagName = normalizeTagName;
exports.uniqueTags = uniqueTags;
exports.normalizeUnique = normalizeUnique;
const lodash_1 = require("lodash");
const string_utils_1 = require("./string-utils");
function toSlug(input, maxLength = 80) {
    const normalized = (0, string_utils_1.normalizeWhitespace)(input).replace(/['’]/g, '');
    return (0, lodash_1.trim)((0, lodash_1.kebabCase)(normalized), '-').slice(0, maxLength);
}
function normalizeTagName(input, maxLength = 80) {
    const normalized = (0, string_utils_1.normalizeWhitespace)(input)
        .replace(/[|/]+/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
    if (!normalized)
        return null;
    return normalized.length > maxLength ? normalized.slice(0, maxLength).trim() : normalized;
}
function uniqueTags(values, maxTags = 20, maxTagLength = 80) {
    const seen = new Set();
    const result = [];
    for (const value of values) {
        const normalizedName = normalizeTagName(value, maxTagLength);
        if (!normalizedName)
            continue;
        const slug = toSlug(normalizedName, maxTagLength);
        if (!slug || seen.has(slug))
            continue;
        seen.add(slug);
        result.push(normalizedName);
        if (result.length >= maxTags)
            break;
    }
    return result;
}
function normalizeUnique(values) {
    return (0, string_utils_1.unique)(values);
}
