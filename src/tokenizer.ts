import { Underscore } from '../types/global';

export class Tokenizer {
    private input: string;
    private index: number;
    private tokens: Array<Underscore.Token>;

    constructor(input: string) {
        this.input = input.trim();
        this.index = 0;
        this.tokens = [];
    }

    public init(): this | Error {
        while (this.index < this.input.length) {
            let now: string = this.input[this.index] as string;

            if (this.isEmpty(now)) {
                this.index += 1;
            }

            else if (now === '(' || now === ')' || now === '{' || now === '}' || now === '[' || now === ']') {
                this.index += 1;
                this.tokens.push({ type: 'Parentheses', value: now });
            }

            else if (this.isNumeric(now)) {
                let value = now;
                this.index += 1;

                if (this.index < this.input.length) {
                    now = this.input[this.index] || '';

                    while (this.isNumeric(now)) {
                        value += now;
                        this.index += 1;
                        now = this.input[this.index] || '';
                    }
                }

                this.tokens.push({ type: 'Number', value: value });
            }

            else if (this.isAlphabetic(now) || now === '_') {
                let value = now;
                this.index += 1;

                if (this.index < this.input.length) {
                    now = this.input[this.index] || '';

                    while (this.isAlphaNumeric(now)) {
                        value += now;
                        this.index += 1;
                        now = this.input[this.index] || '';
                    }
                }

                this.tokens.push({ type: 'Word', value: value });
            }

            else if (now === '\'' || now === '"') {
                const quote: '\'' | '"' = now;
                let value: string = '';
                this.index += 1;
                now = this.input[this.index] || '';

                while (now !== quote) {
                    value += now;
                    this.index += 1;
                    now = this.input[this.index] || '';
                }

                this.index += 1;
                now = this.input[this.index] || '';

                this.tokens.push({ type: 'String', value: value });
            }

            else if (this.isOperator(now)) {
                let value = now;
                this.index += 1;

                if (this.index < this.input.length) {
                    now = this.input[this.index] || '';

                    while (this.isOperator(now)) {
                        value += now;
                        this.index += 1;
                        now = this.input[this.index] || '';
                    }
                }

                this.tokens.push({ type: 'Op', value: value });
            }
            
            else {
                throw new Error('[INVALID]: Error: invalid character: ' + now);
            }
        }

        return this;
    }

    private isEmpty(c: string): boolean {
        return (/\s/.test(c) || /\n/.test(c));
    }

    private isNumeric(c: string): boolean {
        return (c >= '0' && c <= '9');
    }

    private isAlphabetic(c: string): boolean {
        return ((c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z'));
    }

    private isAlphaNumeric(c: string): boolean {
        return (this.isNumeric(c) || this.isAlphabetic(c) || c === '_')
    }

    private isOperator(c: string): boolean {
        return ((c >= '!' && c <= '~') && (!this.isAlphaNumeric(c)));
    }

    public results(): Array<Underscore.Token> {
        return this.tokens;
    }
}