import { Tokenizer } from '../dist/export.js';
import { describe, it } from 'mocha';

describe('Tokenizer', () => {
    it('Basic numbers', () => {
        const tokenizer = new Tokenizer(`12 791 9102 7182 9102`).init();
        console.log(tokenizer.results());
    });

    it('Basic numbers with operations', () => {
        const tokenizer = new Tokenizer(`(12 * 791) + 9102 / 7182 - 9102`).init();
        console.log(tokenizer.results());
    });

    it('Strings implementation', () => {
        const tokenizer = new Tokenizer(`'hello world' "hello world"`).init();
        console.log(tokenizer.results());
    });
});