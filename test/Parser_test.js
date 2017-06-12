var tape = require("tape"),
    math = require("..");


var from = math.from;


tape("Parser", function(assert) {
    var ast = from("sqrt(10 * 5) + -x");

    assert.deepEquals(ast, {
        type: "AST.BINARY_OPERATION",
        operation: "+",
        left: {
            type: "AST.FUNCTION",
            name: "sqrt",
            args: [{
                type: "AST.BINARY_OPERATION",
                operation: "*",
                left: {
                    type: "AST.NUMBER",
                    value: "10"
                },
                right: {
                    type: "AST.NUMBER",
                    value: "5"
                }
            }]
        },
        right: {
            type: "AST.UNARY_OPERATION",
            operation: "-",
            expr: {
                name: "x",
                type: "AST.VARIABLE"
            }
        }
    });

    assert.end();
});