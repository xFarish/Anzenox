import { tokenizer } from '../dist/anzen/core/tokenizer.js';
import { describe, it } from 'mocha';
import { inspect } from 'util';

describe('Tokenizer', () => {
    it('Tokenize everything successfully', () => {
        const start = Date.now();
        const result = tokenizer(
            `123 abc__123 () 8 . name_with_numbers_l0l ok __iao jia %&$!* (@) *!@_!`
            );
        const end = Date.now();

        console.log(inspect(result, { depth: Infinity }));
        console.log(`Time: ${end - start}`);
    });
});