import { Underscore } from '../types/global';

export class Parser {
    private index: number;
    private tokens: Array<Underscore.Token>;
    private ast: Underscore.AST;

    constructor(tokens: Array<Underscore.Token>) {
        this.index = 0;
        this.tokens = tokens;
        this.ast = { type: 'Program', body: [] };
    }

    public init() {
        try {
            while (this.index < this.tokens.length) {
                this.ast.body.push(this.walk() as Underscore.Node | Underscore.Body);
            }
        } catch (e) {
            throw e;
        }

        return this;
    }

    private walk(): Underscore.Node | Underscore.Body | Error {
        let token: Underscore.Token = (this.tokens[this.index] as Underscore.Token);

        if (token.type == 'Op') {
            this.index += 1;

            switch (token.value) {
                case '~': return {
                    type: 'Tilde',
                    value: '~'
                }

                case '!': return {
                    type: 'Not',
                    value: '!'
                }

                case '@': return {
                    type: 'At',
                    value: '@'
                }

                case '$': return {
                    type: 'Dollar',
                    value: '$'
                }

                case '%': return {
                    type: 'Modulus',
                    value: '%'
                }

                case '^': return {
                    type: 'Xor',
                    value: '^'
                }

                case '&': return {
                    type: 'And',
                    value: '&'
                }

                case '*': return {
                    type: 'Multiply',
                    value: '*'
                }

                case '-': return {
                    type: 'Minus',
                    value: '-'
                }

                case '+': return {
                    type: 'Plus',
                    value: '+'
                }

                case '=': return {
                    type: 'Assign',
                    value: '='
                }

                case '|': return {
                    type: 'Pipe',
                    value: '|'
                }

                case ':': return {
                    type: 'Colon',
                    value: ':'
                }

                case ';': return {
                    type: 'Semi',
                    value: ';'
                }

                case '<': return {
                    type: 'Less',
                    value: '<'
                }

                case '>': return {
                    type: 'More',
                    value: '>'
                }

                case '?': return {
                    type: 'Question',
                    value: '?'
                }

                case '/': return {
                    type: 'Foward',
                    value: '/'
                }

                case '!=': return {
                    type: 'NotEq',
                    value: '!='
                }

                case '%=': return {
                    type: 'ModulusAssign',
                    value: '%='
                }

                case '^=': return {
                    type: 'XorAssign',
                    value: '^='
                }

                case '&&': return {
                    type: 'And',
                    value: '&&'
                }

                case '*=': return {
                    type: 'MultiplyAssign',
                    value: '*='
                }

                case '-=': return {
                    type: 'MinusAssign',
                    value: '-='
                }

                case '--': return {
                    type: 'Decrease',
                    value: '--'
                }

                case '+=': return {
                    type: 'PlusAssign',
                    value: '++'
                }

                case '++': return {
                    type: 'Increase',
                    value: '++'
                }

                case '==': return {
                    type: 'Eq',
                    value: '=='
                }

                case '||': return {
                    type: 'Or',
                    value: '||'
                }

                case '::': return {
                    type: 'Module',
                    value: '::'
                }

                default: throw new Error('[INVALID]: Error: Invalid operator: ' + token.value)
            }
        }

        else if (token.type === 'Parentheses') {
            const type = token.value;
            this.index += 1;
            let node: Underscore.Node;

            if (token.value === '(') {
                node = { type: 'Scope', value: [] };
            } else if (token.value === '[') {
                node = { type: 'Array', value: [] };
            } else if (token.value === '{') {
                node = { type: 'Block', value: [] };
            } else {
                throw new Error('[INVALID]: Error: Invalid parentheses: ' + token.value)
            }

            token = this.tokens[this.index] || {} as Underscore.Token;

            while (token.type !== 'Parentheses' && (token.type === 'Parentheses' && token.value !== type)) {
                node.value.push(this.walk() as Underscore.Node | Underscore.Body);
                this.index += 1;
                token = this.tokens[this.index] || {} as Underscore.Token;
            }

            this.index += 1;
            return node;
        }

        else {
            throw new Error('[INVALID]: Error: Invalid token: ' + token.value)
        }
    }

    results(): Underscore.AST {
        return this.ast;
    }
}