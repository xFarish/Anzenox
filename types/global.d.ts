export namespace Anzen {
    type TokenType = 'Bracket' | 'Number' | 'Identifier' | 'Operator' | 'String';

    interface Token {
        type: TokenType;
        value: string;
    }
    
    interface AST {
        type: string;
        body: Array<Node | Body>;
    }
    
    interface Node {
        type: string;
        value: Array<Node | Body>;
        name?: string;
    }
    
    interface Body {
        type: string;
        value: string;
    }

    interface Visitor {
        [key: string]: {
            enter?: (node: Node | Body, parent) => void;
            exit?: (node: Node | Body, parent) => void;
        }
    }
}