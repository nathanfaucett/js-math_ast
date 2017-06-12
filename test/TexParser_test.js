var tape = require("tape"),
    math = require("..");


var fromTex = math.fromTex;


tape("TexParser", function(assert) {
    var ast = fromTex("\\sqrt{\\frac{2}{1} + -x}");

    assert.deepEquals(ast, {
        type: "AST.FUNCTION",
        name: "sqrt",
        args: [{
            type: "AST.BINARY_OPERATION",
            operation: "+",
            left: {
                type: "AST.BINARY_OPERATION",
                operation: "/",
                left: {
                    type: "AST.NUMBER",
                    value: "2"
                },
                right: {
                    type: "AST.NUMBER",
                    value: "1"
                }
            },
            right: {
                type: "AST.UNARY_OPERATION",
                operation: "-",
                expr: {
                    name: "x",
                    type: "AST.VARIABLE"
                }
            }
        }]
    });

    assert.equals(ast.equals(ast), true);
    assert.equals(ast.toString(), "sqrt(2 / 1 + -x)");
    assert.equals(ast.toTex(), "\\sqrt{\\frac{2}{1} + -x}");

    assert.end();
});

tape("TexParser order of ops", function(assert) {
    var ast = fromTex("-(1 + 2 - 3 * 4 / 5)");

    assert.deepEquals(ast, {
        type: "AST.UNARY_OPERATION",
        operation: "-",
        expr: {
            type: "AST.GROUP",
            open: "(",
            close: ")",
            expr: {
                type: "AST.BINARY_OPERATION",
                operation: "-",
                left: {
                    type: "AST.BINARY_OPERATION",
                    operation: "+",
                    left: {
                        type: "AST.NUMBER",
                        value: "1"
                    },
                    right: {
                        type: "AST.NUMBER",
                        value: "2"
                    }
                },
                right: {
                    type: "AST.BINARY_OPERATION",
                    operation: "*",
                    left: {
                        type: "AST.NUMBER",
                        value: "3"
                    },
                    right: {
                        type: "AST.BINARY_OPERATION",
                        operation: "/",
                        left: {
                            type: "AST.NUMBER",
                            value: "4"
                        },
                        right: {
                            type: "AST.NUMBER",
                            value: "5"
                        }
                    }
                }
            }
        }
    });

    assert.equals(ast.toString(), "-(1 + 2 - 3 * 4 / 5)");
    assert.equals(ast.toTex(), "-(1 + 2 - 3 * \\frac{4}{5})");

    assert.end();
});

tape("TexParser complex", function(assert) {
    var ast = fromTex("\\frac{\\frac{2}{3}}{\\frac{1}{2}}}");

    assert.equals(ast.toTex(), "\\frac{\\frac{2}{3}}{\\frac{1}{2}}");

    assert.end();
});

tape("TexParser power", function(assert) {
    assert.equals(fromTex("2^x").toTex(), "2 ^ x");
    assert.equals(fromTex("0^0").toTex(), "0 ^ 0");
    assert.equals(fromTex("0^{x + 2}").toTex(), "0 ^ {x + 2}");
    assert.end();
});