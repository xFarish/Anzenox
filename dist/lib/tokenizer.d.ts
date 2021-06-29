import { Underscore } from '../types/global';
export declare class Tokenizer {
    private input;
    private index;
    private tokens;
    constructor(input: string);
    init(): this | Error;
    private isEmpty;
    private isNumeric;
    private isAlphabetic;
    private isAlphaNumeric;
    private isOperator;
    results(): Array<Underscore.Token>;
}
