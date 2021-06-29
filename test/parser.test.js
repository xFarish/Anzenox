import { Tokenizer } from '../src/core/tokenizer.js';
import { Parser } from '../src/core/parser.js';

const tokenizer = new Tokenizer(
    `
    += ++ || -- -= ^= %= @
    `
).init();

const parser = new Parser(tokenizer.results()).init();
console.log(parser.results());

tokenizer.clear();
parser.clear();