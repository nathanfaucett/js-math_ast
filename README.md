math_ast [![Build Status](https://travis-ci.org/nathanfaucett/js-math_ast.svg?branch=master)](https://travis-ci.org/nathanfaucett/js-math_ast)
=======

math ast

```javascript
var mathAST = require("@nathanfaucett/math_ast");


var fromTex = mathAST.fromTex;


var ast = mathAST.fromTex("x + 4 * \\sqrt{2}");

/*
ast === {
    type: "AST.BINARY_OPERATION",
    operation: "+",
    left: {
        type: "AST.VARIABLE",
        name: "x"
    },
    right: {
        type: "AST.BINARY_OPERATION",
        operation: "*",
        left: {
            type: "AST.NUMBER",
            value: "4"
        },
        right: {
            type: "AST.FUNCTION",
            name: "sqrt",
            args: [{
                type: "AST.NUMBER",
                value: "2"
            }]
        }
    }
};
*/

ast.toString() === "x + 4 * sqrt(2)";
ast.toTex() === "x + 4 * \\sqrt{2}";
```
