import { Anzen } from '../../types/global';

// @ts-ignore
export function parser(tokens: Array<Anzen.Token>): Anzen.AST | never {
    // @ts-ignore
    let count = 0;
    const ast: Anzen.AST = {
        type: 'Program',
        body: []
    }

    // @ts-ignore
    function walk(): Anzen.Body | Anzen.Node | never {
        
    }

    while (count < tokens.length) {
        ast.body.push(walk());
    }

    return ast;
}