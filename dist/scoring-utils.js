"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lexicalScore = lexicalScore;
function lexicalScore(question, content) {
    const questionTokens = new Set(String(question || '')
        .toLowerCase()
        .split(/\W+/)
        .map((token) => token.trim())
        .filter((token) => token.length > 2));
    if (!questionTokens.size)
        return 0;
    const contentTokens = new Set(String(content || '')
        .toLowerCase()
        .split(/\W+/)
        .map((token) => token.trim())
        .filter((token) => token.length > 2));
    if (!contentTokens.size)
        return 0;
    let overlap = 0;
    questionTokens.forEach((token) => {
        if (contentTokens.has(token))
            overlap += 1;
    });
    return overlap / questionTokens.size;
}
