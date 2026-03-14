"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeWhitespace = normalizeWhitespace;
exports.stripCodeFence = stripCodeFence;
exports.unique = unique;
exports.extractYears = extractYears;
exports.toExcerpt = toExcerpt;
const lodash_1 = require("lodash");
function normalizeWhitespace(value) {
    return (0, lodash_1.trim)(String(value || '').replace(/\s+/g, ' '));
}
function stripCodeFence(value) {
    return String(value || '')
        .replace(/^```json\s*/i, '')
        .replace(/^```\s*/i, '')
        .replace(/\s*```$/i, '')
        .trim();
}
function unique(values) {
    return (0, lodash_1.uniq)(values.map((value) => String(value || '').trim()).filter(Boolean));
}
function extractYears(text) {
    const matches = String(text || '').match(/\b(19|20)\d{2}\b/g) || [];
    return (0, lodash_1.uniq)(matches);
}
function toExcerpt(value, size = 800) {
    const normalized = normalizeWhitespace(String(value || ''));
    if (!normalized)
        return null;
    if (normalized.length <= size)
        return normalized;
    return `${normalized.slice(0, size).trim()}...`;
}
