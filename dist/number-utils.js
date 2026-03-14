"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toNumberOrNull = toNumberOrNull;
exports.toNumber = toNumber;
function toNumberOrNull(value) {
    if (value === null || value === undefined)
        return null;
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
}
function toNumber(value) {
    return toNumberOrNull(value);
}
