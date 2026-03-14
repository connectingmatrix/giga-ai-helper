"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sanitizeActionName = sanitizeActionName;
function sanitizeActionName(value, allowed) {
    const normalized = String(value || '').trim();
    return allowed.has(normalized) ? normalized : null;
}
