export namespace Underscore {
    interface Token {
        type: string;
        value: string;
    }
    
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