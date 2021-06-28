export class Tokenizer {
    #input;
    #index;
    #tokens;

    /**
     * @param {string} input
     * The input string
     * 
     * @example
     * ```js
     * const tokenizer = new Tokenizer("1002 - 81.912 + (92 * 7)");
     * ```
     */
    constructor(input) {
        this.#input = input.trim();
        this.#index = 0;
        this.#tokens = [];
    }

    init() {
        while (this.#index < this.#input.length) {
            let now = this.#input[this.#index];

            if (this.isEmpty(now)) {
                this.#index += 1;
            }

            else if (this.isNumeric(now)) {
                let value = now;
                this.#index += 1;

                if (this.#index < this.#input.length) {
                    now = this.#input[this.#index];

                    while (this.isNumeric(now)) {
                        value += now;
                        this.#index += 1;
                        now = this.#input[this.#index];
                    }
                }

                this.#tokens.push({ type: 'Number', value: value });
            }

            else if (this.isAlphabetic(now) || now === '_') {
                let value = now;
                this.#index += 1;

                if (this.#index < this.#input.length) {
                    now = this.#input[this.#index];

                    while (this.isAlphaNumeric(now)) {
                        value += now;
                        this.#index += 1;
                        now = this.#input[this.#index];
                    }
                }

                this.#tokens.push({ type: 'Word', value: value });
            }

            else if (this.isOperator(now)) {
                let value = now;
                this.#index += 1;

                if (this.#index < this.#input.length) {
                    now = this.#input[this.#index];

                    while (this.isOperator(now)) {
                        value += now;
                        this.#index += 1;
                        now = this.#input[this.#index];
                    }
                }

                this.#tokens.push({ type: 'Op', value: value });
            }
        }
    }

    /**
     * @private
     */
    isEmpty(c) {
        return (/\s/.test(c) || /\n/.test(c));
    }

    /**
     * @private
     */
    isNumeric(c) {
        return (c >= '0' && c <= '9');
    }

    /**
     * @private
     */
    isAlphabetic(c) {
        return ((c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z'));
    }

    /**
     * @private
     */
    isAlphaNumeric(c) {
        return (this.isNumeric(c) || this.isAlphabetic(c) || c === '_')
    }

    /**
     * @private
     */
    isOperator(c) {
        return ((c >= '!' && c <= '~') && (!this.isNumeric(c)));
    }

    results() {
        return this.#tokens;
    }

    clear() {
        this.#tokens = [];
        this.#input = '';
        this.#index = 0;
    }
}