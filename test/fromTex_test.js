var tape = require("tape"),
    math = require("..");


var fromTex = math.fromTex;


tape("fromTex", function(assert) {
    var ast = fromTex("x + 4 * \\sqrt{2}");

    assert.deepEquals(ast, {
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
    });

    assert.equals(ast.toString(), "x + 4 * sqrt(2)");
    assert.equals(ast.toTex(), "x + 4 * \\sqrt{2}");

    assert.end();
});