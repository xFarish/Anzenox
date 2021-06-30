import { isAlphabetic, isBracket, isNumeric, isOperator, isSpace } from '../utils/value.js';
import { Anzen } from '../../types/global';

export function tokenizer(input: string): Array<Anzen.Token> {
    const tokens: Array<Anzen.Token> = [];
    let count = 0;

    while (count < input.length) {
        let now = input[count] as string;

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
                now = input[count] as string;

                while (isNumeric(now)) {
                    value += now;
                    count += 1;
                    now = input[count] as string;
                }
            }

            tokens.push({ type: 'Num', value });
        }

        else if (isAlphabetic(now) && !isNumeric(now)) {
            let value = now;
            count += 1;

            if (count < input.length) {
                now = input[count] as string;

                while (isAlphabetic(now)) {
                    value += now;
                    count += 1;
                    now = input[count] as string;
                }
            }

            tokens.push({ type: 'Wrd', value });
        }

        else if (isOperator(now)) {
            let value = now;
            count += 1;

            if (count < input.length) {
                now = input[count] as string;

                while (isOperator(now)) {
                    value += now;
                    count += 1;
                    now = input[count] as string;
                }
            }

            tokens.push({ type: 'Op', value });
        }
    }

    return tokens;
}