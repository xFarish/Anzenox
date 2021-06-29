import { Underscore } from '../types/global';
export declare class Parser {
    private index;
    private tokens;
    private ast;
    constructor(tokens: Array<Underscore.Token>);
    init(): this;
    private walk;
    results(): Underscore.AST;
}
