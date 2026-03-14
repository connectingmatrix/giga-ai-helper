"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getExtensionFromMimeType = getExtensionFromMimeType;
exports.extractTextFromFile = extractTextFromFile;
exports.validateFiles = validateFiles;
const path_1 = __importDefault(require("path"));
const lodash_1 = require("lodash");
const mammoth_1 = __importDefault(require("mammoth"));
const pdf_parse_1 = require("pdf-parse");
const mime_1 = require("./constants/mime");
function getExtensionFromMimeType(file, mimeExtensionMap = mime_1.DEFAULT_MIME_EXTENSION_MAP) {
    const mimeType = String(file.mimetype || '')
        .split(';')[0]
        .trim()
        .toLowerCase();
    if (mimeType && mimeExtensionMap[mimeType]) {
        return mimeExtensionMap[mimeType];
    }
    const fallbackExt = path_1.default.extname(String(file.originalname || '')).toLowerCase().replace(/^\./, '');
    if (fallbackExt)
        return fallbackExt;
    if (mimeType.includes('/')) {
        const subtype = mimeType.split('/')[1]?.split('+')[0];
        const sanitizedSubtype = (subtype || '').replace(/[^a-z0-9]/g, '');
        if (sanitizedSubtype)
            return sanitizedSubtype;
    }
    return 'bin';
}
async function extractTextFromFile(file) {
    const extension = path_1.default.extname(String(file.originalname || '')).toLowerCase();
    if (file.mimetype === 'application/pdf' || extension === '.pdf') {
        const pdfParse = new pdf_parse_1.PDFParse({ data: file.buffer });
        const pdfData = await pdfParse.getText();
        return (0, lodash_1.trim)(String(pdfData.text || ''));
    }
    if (file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
        extension === '.docx') {
        const result = await mammoth_1.default.extractRawText({ buffer: file.buffer });
        return (0, lodash_1.trim)(String(result.value || ''));
    }
    if (file.mimetype === 'text/plain' ||
        file.mimetype === 'text/markdown' ||
        file.mimetype === 'text/csv' ||
        file.mimetype === 'application/json' ||
        extension === '.txt' ||
        extension === '.md' ||
        extension === '.csv' ||
        extension === '.json') {
        return (0, lodash_1.trim)(file.buffer.toString('utf8'));
    }
    return '';
}
function validateFiles(files, allowedMimeTypes = mime_1.DEFAULT_ALLOWED_MIME_TYPES, allowedExtensions = mime_1.DEFAULT_ALLOWED_EXTENSIONS) {
    for (const file of files) {
        const extension = path_1.default.extname(String(file.originalname || '')).toLowerCase();
        if (!allowedMimeTypes.includes(String(file.mimetype || '')) &&
            !allowedExtensions.includes(extension)) {
            throw new Error(`Unsupported file type: ${String(file.originalname || 'unknown')} (${String(file.mimetype || 'unknown')})`);
        }
    }
}
