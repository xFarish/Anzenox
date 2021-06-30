function isWhitespace(c: string): boolean {
    return c === ' ';
}

function isNewline(c: string): boolean {
    return c === '\n';
}

export function isSpace(c: string): boolean {
    return isWhitespace(c) || isNewline(c);
}

export function isAlphabetic(c: string): boolean {
    return (c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z');
}

export function isNumeric(c: string): boolean {
    return c >= '0' && c <= '9';
}

export function isAlphaNumeric(c: string): boolean {
    return isAlphabetic(c) || isNumeric(c) || c === '_';
}

export function isOperator(c: string): boolean {
    return (c >= '!' && c <= '~') && !isBracket(c) && !isAlphaNumeric(c);
}

export function isBracket(c: string): boolean {
    return c === '[' || c === ']' || c === '(' || c === ')' || c === '{' || c === '}';
}