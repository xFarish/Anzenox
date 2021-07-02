import { tokenizer } from '../dist/anzen/core/tokenizer.js';
import { parser } from '../dist/anzen/core/parser.js'
import { describe, it } from 'mocha';
import { inspect } from 'util';

describe('Parser', () => {
    it('Parse everything successfully', () => {
        let result = tokenizer(
            `
            # This is a comment
            use std::print;

            func main() {
                print("Hello world");
            }
            `
        );

        const start = Date.now();
        result = parser(result);
        const end = Date.now();

        console.log(inspect(result, { depth: Infinity }));
        console.log(`Time: ${end - start}`);
    })
});