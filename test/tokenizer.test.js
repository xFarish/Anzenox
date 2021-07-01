import { tokenizer } from '../dist/anzen/core/tokenizer.js';
import { describe, it } from 'mocha';

describe('Tokenizer', () => {
    it('Tokenize everything successfully', () => {
        const start = Date.now();
        const res = tokenizer(
            `123 abc__123 () 8 . name_with_numbers_l0l ok __iao jia %&$!* (@) *!@_!`
        );
        const end = Date.now();

        console.log(res);
        
        console.log(`Time: ${end - start}`);
    });
});