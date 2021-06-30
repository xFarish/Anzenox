export namespace Anzen {
    interface Token {
        type: TokenType;
        value: string;
    }

    type TokenType = 'Brckt' | 'Num' | 'Wrd' | 'Op'
    
    interface AST {
        type: string;
        body: Array<Node | Body>;
    }
    
    interface Node {
        type: string;
        value: Array<Node | Body>;
    }
    
    interface Body {
        type: string;
        value: string;
    }
}