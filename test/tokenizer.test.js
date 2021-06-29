import { Tokenizer } from '../src/core/tokenizer.js';

const tokenizer = new Tokenizer(
    `hello_world 123, (123, 8192) / *0 819jw
    \
    `
).init();

export const results = tokenizer.results();

console.log(results);
tokenizer.clear();