import { Anzen } from '../../types/global';
import { error } from '../utils/log.js';
import { keyword } from '../syntax/keyword.js';

export function parser(tokens: Array<Anzen.Token>): Anzen.AST | never {
    let index = 0;
    const ast: Anzen.AST = {
        type: 'Program',
        body: []
    }

    function walk(): Anzen.Body | Anzen.Node | never {
        let token = tokens[index] as Anzen.Token;

        if (token.type === 'Operator' && token.value !== '\\') {
            index += 1;
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
                    type: '&',
                    value: 'And'
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

                case '.': return {
                    type: 'Dot',
                    value: '.'
                }

                case ',': return {
                    type: 'Comma',
                    value: ','
                }

                case ':': return {
                    type: 'Colon',
                    value: ':'
                }

                case ';': return {
                    type: 'Semi',
                    value: ';'
                }

                case '/': return {
                    type: 'Foward',
                    value: '/'
                }

                case '\\': return {
                    type: 'Backward',
                    value: '\\'
                }

                case '!=': return {
                    type: 'NotEq',
                    value: '!='
                }

                case '%=': return {
                    type: 'ModulusAssign',
                    value: '%='
                }

                case '&&': return {
                    type: 'AndAnd',
                    value: '&&'
                }

                case '**': return {
                    type: 'Power',
                    value: '**'
                }

                case '*': return {
                    type: 'MultiplyAssign',
                    value: ''
                }

                case '--': return {
                    type: 'Decrease',
                    value: '--'
                }

                case '-=': return {
                    type: 'MinusAssign',
                    value: '-='
                }

                case '++': return {
                    type: 'Increase',
                    value: '++'
                }

                case '+=': return {
                    type: 'PlusAssign',
                    value: '+='
                }

                case '||': return {
                    type: 'Or',
                    value: '||'
                }

                case '<<': return {
                    type: 'LeftShift',
                    value: '<<'
                }

                case '>>': return {
                    type: 'RightShift',
                    value: '>>'
                }

                case '>=': return {
                    type: 'MoreOrEq',
                    value: '>='
                }

                case '<=': return {
                    type: 'LessOrEq',
                    value: '<='
                }

                case '::': return {
                    type: 'Module',
                    value: '::'
                }

                default: {
                    error('ERR', 'Invalid operator: ' + token.value);
                    return process.exit(1);
                }
            }
        }

        else if (token.type === 'Bracket' && token.value == '[') {
            index += 1;
            token = tokens[index] as Anzen.Token;

            const node: Anzen.Node = {
                type: 'Array',
                value: []
            }

            while (token.type !== 'Bracket' || (token.type === 'Bracket' && token.value !== ']')) {
                node.value.push(walk());
                token = tokens[index] as Anzen.Token;
            }

            index += 1;
            return node;
        }
        
        else if (token.type === 'Bracket' && token.value === '(') {
            index += 1;
            token = tokens[index] as Anzen.Token;

            const node: Anzen.Node = {
                type: 'CodeCave',
                value: []
            }

            let prev = tokens[index - 2];
            if (typeof(prev) !== 'undefined' && prev.type === 'Identifier') {
                node.name = prev.value;
            }

            while (token.type !== 'Bracket' || (token.type === 'Bracket' && token.value !== ')')) {
                node.value.push(walk());
                token = tokens[index] as Anzen.Token;
            }

            index += 1;
            return node;
        }

        else if (token.type === 'Bracket' && token.value === '{') {
            index += 1;
            token = tokens[index] as Anzen.Token;

            const node: Anzen.Node = {
                type: 'Block',
                value: []
            }

            while (token.type !== 'Bracket' || (token.type === 'Bracket' && token.value !== '}')) {
                node.value.push(walk());
                token = tokens[index] as Anzen.Token;
            }

            index += 1;
            return node;
        }

        else if (token.type === 'Number') {
            index += 1;
            if ((tokens[index]?.type === 'Operator' && tokens[index]?.value === '.') && tokens[index + 1]?.type === 'Identifier') {
                index += 2;
                return {
                    type: 'Number',
                    value: token.type + '.' + tokens[index - 1]?.value
                }
            } else {
                return {
                    type: 'Number',
                    value: token.value
                }
            }
        }

        else if (token.type === 'Identifier') {
            index += 1;
            if (keyword.includes(token.value)) {
                return {
                    type: 'Keyword',
                    value: token.value
                }
            } else {
                return {
                    type: 'Identifier',
                    value: token.value
                }
            }
        }

        else if (token.type === 'String') {
            index += 1;
            return {
                type: 'String',
                value: token.value
            }
        }

        else {
            error('ERR', 'Invalid token: ' + token.value);
            return process.exit(1);
        }
    }

    while (index < tokens.length) {
        ast.body.push(walk());
    }

    return ast;
}