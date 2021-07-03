import { Anzen } from '../../types/global';

export function verifier(ast: Anzen.AST) {
    let tree: Anzen.AST = {
        type: 'Program',
        body: []
    };

    (ast as any)._context = tree.body;

    traverser(ast, {
        'Tilde': {
            enter(node, parent) {
                parent._context.push({
                    type: 'Tilde',
                    value: node.value
                });
            }
        },

        'Not': {
            enter(node, parent) {
                parent._context.push({
                    type: 'Not',
                    value: node.value
                });
            }
        },

        'At': {
            enter(node, parent) {
                parent._context.push({
                    type: 'At',
                    value: node.value
                });
            }
        },

        'Dollar': {
            enter(node, parent) {
                parent._context.push({
                    type: 'Dollar',
                    value: node.value
                });
            }
        },

        'Modulus': {
            enter(node, parent) {
                parent._context.push({
                    type: 'Modulus',
                    value: node.value
                });
            }
        },

        'Xor': {
            enter(node, parent) {
                parent._context.push({
                    type: 'Xor',
                    value: node.value
                });
            }
        },

        'And': {
            enter(node, parent) {
                parent._context.push({
                    type: 'And',
                    value: node.value
                });
            }
        },

        'Multiply': {
            enter(node, parent) {
                parent._context.push({
                    type: 'Multiply',
                    value: node.value
                });
            }
        },

        'Minus': {
            enter(node, parent) {
                parent._context.push({
                    type: 'Minus',
                    value: node.value
                });
            }
        },

        'Plus': {
            enter(node, parent) {
                parent._context.push({
                    type: 'Plus',
                    value: node.value
                });
            }
        },

        'Assign': {
            enter(node, parent) {
                parent._context.push({
                    type: 'Assign',
                    value: node.value
                });
            }
        },

        'Pipe': {
            enter(node, parent) {
                parent._context.push({
                    type: 'Pipe',
                    value: node.value
                });
            }
        },

        'Less': {
            enter(node, parent) {
                parent._context.push({
                    type: 'Less',
                    value: node.value
                });
            }
        },

        'More': {
            enter(node, parent) {
                parent._context.push({
                    type: 'More',
                    value: node.value
                });
            }
        },

        'Question': {
            enter(node, parent) {
                parent._context.push({
                    type: 'Question',
                    value: node.value
                });
            }
        },

        'Dot': {
            enter(node, parent) {
                parent._context.push({
                    type: 'Dot',
                    value: node.value
                });
            }
        },

        'Comma': {
            enter(node, parent) {
                parent._context.push({
                    type: 'Comma',
                    value: node.value
                });
            }
        },

        'Colon': {
            enter(node, parent) {
                parent._context.push({
                    type: 'Colon',
                    value: node.value
                });
            }
        },

        'Semi': {
            enter(node, parent) {
                parent._context.push({
                    type: 'Semi',
                    value: node.value
                });
            }
        },

        'Foward': {
            enter(node, parent) {
                parent._context.push({
                    type: 'Foward',
                    value: node.value
                });
            }
        },

        'Backward': {
            enter(node, parent) {
                parent._context.push({
                    type: 'Backward',
                    value: node.value
                });
            }
        },

        'NotEq': {
            enter(node, parent) {
                parent._context.push({
                    type: 'NotEq',
                    value: node.value
                });
            }
        },

        'ModulusAssign': {
            enter(node, parent) {
                parent._context.push({
                    type: 'ModulusAssign',
                    value: node.value
                });
            }
        },

        'AndAnd': {
            enter(node, parent) {
                parent._context.push({
                    type: 'AndAnd',
                    value: node.value
                });
            }
        },

        'Power': {
            enter(node, parent) {
                parent._context.push({
                    type: 'Power',
                    value: node.value
                });
            }
        },

        'MultiplyAssign': {
            enter(node, parent) {
                parent._context.push({
                    type: 'MultiplyAssign',
                    value: node.value
                });
            }
        },

        'Number': {
            enter(node, parent) {
                parent._context.push({
                    type: 'Number',
                    value: node.value
                });
            }
        },

        'Identifier': {
            enter(node, parent) {
                parent._context.push({
                    type: 'Identifier',
                    value: node.value
                });
            }
        }
    });

    return tree;
}

function traverser(ast: Anzen.AST, visitor: Anzen.Visitor) {
    function traverseArray(array: Array<Anzen.Node | Anzen.Body | Anzen.AST>, parent: any) {
        array.forEach(child => {
            traverseNode(child, parent);
        });
    }

    function traverseNode(node: Anzen.Node | Anzen.Body | Anzen.AST, parent: any) {
        let methods = visitor[node.type];

        if (methods && methods.enter) {
            methods.enter((node as Anzen.Node | Anzen.Body), parent);
        }

        switch (node.type) {
            case 'Program': {
                traverseArray((node as Anzen.AST).body, parent);
                break;
            }

            case 'Block': {
                traverseArray((node as Anzen.Node).value, parent);
                break;
            }

            case 'CodeCave': {
                traverseArray((node as Anzen.Node).value, parent);
                break;
            }

            default: {
                break;
            }
        }

        if (methods && methods.exit) {
            methods.exit((node as Anzen.Node | Anzen.Body), parent);
        }
    }

    traverseNode(ast, null);
}