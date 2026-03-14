"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toPgVector = toPgVector;
exports.parseEmbeddingValue = parseEmbeddingValue;
exports.cosineSimilarity = cosineSimilarity;
const json_utils_1 = require("./json-utils");
function toPgVector(vectorArray) {
    return `[${vectorArray.join(',')}]`;
}
function parseEmbeddingValue(value) {
    if (!value)
        return null;
    if (Array.isArray(value)) {
        const vector = value.map((v) => Number(v)).filter((v) => Number.isFinite(v));
        return vector.length ? vector : null;
    }
    if (typeof value === 'string') {
        const trimmed = value.trim();
        const jsonLike = trimmed.startsWith('[') ? trimmed : `[${trimmed}]`;
        const parsed = (0, json_utils_1.safeJsonParse)(jsonLike);
        if (!parsed || !Array.isArray(parsed))
            return null;
        const vector = parsed.map((v) => Number(v)).filter((v) => Number.isFinite(v));
        return vector.length ? vector : null;
    }
    return null;
}
function cosineSimilarity(a, b) {
    if (!a.length || !b.length || a.length !== b.length)
        return null;
    let dot = 0;
    let normA = 0;
    let normB = 0;
    for (let index = 0; index < a.length; index += 1) {
        dot += a[index] * b[index];
        normA += a[index] * a[index];
        normB += b[index] * b[index];
    }
    if (!normA || !normB)
        return null;
    return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}
