"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_MIME_EXTENSION_MAP = exports.DEFAULT_ALLOWED_EXTENSIONS = exports.DEFAULT_ALLOWED_MIME_TYPES = exports.TEXTUAL_DOCUMENT_KEYWORDS = exports.ALWAYS_ALLOWED_DOCUMENT_MIME_TYPES = void 0;
exports.isReadableDocumentMimeType = isReadableDocumentMimeType;
const lodash_1 = require("lodash");
const mimeDb = require('mime-db');
exports.ALWAYS_ALLOWED_DOCUMENT_MIME_TYPES = new Set([
    'application/pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]);
exports.TEXTUAL_DOCUMENT_KEYWORDS = [
    'json',
    'xml',
    'yaml',
    'yml',
    'csv',
    'markdown',
    'toml',
    'x-www-form-urlencoded',
];
function isReadableDocumentMimeType(mimeType, entry) {
    if (exports.ALWAYS_ALLOWED_DOCUMENT_MIME_TYPES.has(mimeType))
        return true;
    if (mimeType.startsWith('text/'))
        return true;
    if (exports.TEXTUAL_DOCUMENT_KEYWORDS.some((keyword) => mimeType.includes(keyword)))
        return true;
    return Boolean(entry.compressible);
}
exports.DEFAULT_ALLOWED_MIME_TYPES = Object.entries(mimeDb)
    .filter(([mimeType, entry]) => isReadableDocumentMimeType(mimeType, entry))
    .map(([mimeType]) => mimeType)
    .sort();
exports.DEFAULT_ALLOWED_EXTENSIONS = (0, lodash_1.uniq)(exports.DEFAULT_ALLOWED_MIME_TYPES.flatMap((mimeType) => (mimeDb[mimeType]?.extensions || []).map((extension) => `.${extension.toLowerCase()}`))).sort();
exports.DEFAULT_MIME_EXTENSION_MAP = exports.DEFAULT_ALLOWED_MIME_TYPES.reduce((accumulator, mimeType) => {
    const extension = mimeDb[mimeType]?.extensions?.[0];
    if (extension) {
        accumulator[mimeType] = extension.toLowerCase();
    }
    return accumulator;
}, {});
