import { Anzen } from '../../types/global';
import { error } from '../utils/log.js';

export function tokenizer(input: string): Array<Anzen.Token> | never {
    input = input.trim();

    const tokens: Array<Anzen.Token> = [];
    let index = 0;
    
    while (index < input.length) {
        let now = input[index] as string;

        if (isSpace(now)) {
            index += 1;
        }

        else if (now === '#') {
            while (index < input.length && input[index] !== '\n') {
                index += 1;
            }
        }

        else if (isBracket(now)) {
            index += 1;
            tokens.push({ type: 'Bracket', value: now });
        }

        else if (isNumeric(now)) {
            let value = now;
            index += 1;

            if (index < input.length) {
                now = input[index] as string;

                while (isNumeric(now)) {
                    value += now;
                    index += 1;
                    now = input[index] as string;
                }
            }

            tokens.push({ type: 'Number', value });
        }

        else if (isAlphabetic(now) || now === '_') {
            let value = now;
            index += 1;

            if (index < input.length) {
                now = input[index] as string;

                while (isAlphabetic(now) || isNumeric(now) || now === '_') {
                    value += now;
                    index += 1;
                    now = input[index] as string;
                }
            }

            tokens.push({ type: 'Identifier', value });
        }

        else if (now === '"' || now === '\'') {
            let type = now;
            let value = '';
            index += 1;
            now = input[index] as string;

            while (now !== type) {
                value += now;
                index += 1;
                now = input[index] as string;
            }

            index += 1;
            now = input[index] as string;

            tokens.push({ type: 'String', value });
        }

        else if (isOperator(now) && now !== '#') {
            let value = now;
            index += 1;

            if (index < input.length) {
                now = input[index] as string;

                while (isOperator(now)) {
                    value += now;
                    index += 1;
                    now = input[index] as string;
                }
            }

            tokens.push({ type: 'Operator', value });
        }

        else {
            error('ERR', 'ERR character: ' + now);
            return process.exit(1);
        }
    }

    return tokens;
}

function isSpace(c: string): boolean {
    return c === ' ' || c === '\n';
}

function isBracket(c: string): boolean {
    return c === '[' || c === ']' || c === '(' || c === ')' || c === '{' || c === '}';
}

function isNumeric(c: string): boolean {
    return c >= '0' && c <= '9';
}

function isAlphabetic(c: string): boolean {
    return (c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z');
}

function isOperator(c: string): boolean {
    return (c >= '!' && c <= '~') && (!isBracket(c) && !isAlphabetic(c) && !isNumeric(c));
}