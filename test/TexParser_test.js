var tape = require("tape"),
    math = require("..");


var TexLexer = math.TexLexer,
    TexParser = math.TexParser;


tape("TexParser", function(assert) {
    var lexer = new TexLexer("\\sqrt{\\frac{2}{1} + -x}"),
        parser = new TexParser(lexer.collect()),
        ast = parser.parse();

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
    var lexer = new TexLexer("-(1 + 2 - 3 * 4 / 5)"),
        parser = new TexParser(lexer.collect()),
        ast = parser.parse();

    assert.deepEquals(ast, {
        type: "AST.UNARY_OPERATION",
        operation: "-",
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
    });

    assert.equals(ast.toString(), "-(1 + 2 - 3 * 4 / 5)");
    assert.equals(ast.toTex(), "-(1 + 2 - 3 * \\frac{4}{5})");

    assert.end();
});

tape("TexParser complex", function(assert) {
    var lexer = new TexLexer("\\frac{\\frac{2}{3}}{\\frac{1}{2}}}"),
        parser = new TexParser(lexer.collect()),
        ast = parser.parse();

    assert.equals(ast.toTex(), "\\frac{\\frac{2}{3}}{\\frac{1}{2}}");

    assert.end();
});