import { isAlphabetic, isBracket, isNumeric, isOperator, isSpace } from '../utils/value.js';
export function tokenizer(input) {
    const tokens = [];
    let count = 0;
    while (count < input.length) {
        let now = input[count];
        if (isSpace(now)) {
            count += 1;
        }
        else if (isBracket(now)) {
            tokens.push({ type: 'Brckt', value: now });
        }
        else if (isNumeric(now)) {
            let value = now;
            count += 1;
            if (count < input.length) {
                now = input[count];
                while (isNumeric(now)) {
                    value += now;
                    count += 1;
                    now = input[count];
                }
            }
            tokens.push({ type: 'Num', value });
        }
        else if (isAlphabetic(now) && !isNumeric(now)) {
            let value = now;
            count += 1;
            if (count < input.length) {
                now = input[count];
                while (isAlphabetic(now)) {
                    value += now;
                    count += 1;
                    now = input[count];
                }
            }
            tokens.push({ type: 'Wrd', value });
        }
        else if (isOperator(now)) {
            let value = now;
            count += 1;
            if (count < input.length) {
                now = input[count];
                while (isOperator(now)) {
                    value += now;
                    count += 1;
                    now = input[count];
                }
            }
            tokens.push({ type: 'Op', value });
        }
    }
    return tokens;
}
