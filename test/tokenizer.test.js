import { Tokenizer } from '../src/core/tokenizer.js';
import { describe, it } from 'mocha';

describe('Tokenizer', () => {
    it('Basic numbers', async () => {
        const tokenizer = new Tokenizer(`12 791 9102 7182 9102`).init();
        
        console.log(tokenizer.results());
        tokenizer.clear();
    });

    it('Basic numbers with operations', async () => {
        const tokenizer = new Tokenizer(`(12 * 791) + 9102 / 7182 - 9102`).init();
        
        console.log(tokenizer.results());
        tokenizer.clear();
    });
});