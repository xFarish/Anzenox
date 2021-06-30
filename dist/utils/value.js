function isWhitespace(c) {
    return c === ' ';
}
function isNewline(c) {
    return c === '\n';
}
export function isSpace(c) {
    return isWhitespace(c) || isNewline(c);
}
export function isAlphabetic(c) {
    return (c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z');
}
export function isNumeric(c) {
    return c >= '0' && c <= '9';
}
export function isAlphaNumeric(c) {
    return isAlphabetic(c) || isNumeric(c) || c === '_';
}
export function isOperator(c) {
    return (c >= '!' && c <= '~') && !isBracket(c) && !isAlphaNumeric(c);
}
export function isBracket(c) {
    return c === '[' || c === ']' || c === '(' || c === ')' || c === '{' || c === '}';
}
