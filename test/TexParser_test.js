var tape = require("tape"),
    math = require("..");


var TexLexer = math.TexLexer,
    TexParser = math.TexParser;


tape("TexLexer", function(assert) {
    var lexer = new TexLexer("\\sqrt{\\frac{2}{1} + 1}"),
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
                type: "AST.NUMBER",
                value: "1"
            }
        }]
    });
    assert.equals(ast.equals(ast), true);
    assert.equals(ast.toString(), "sqrt(2 / 1 + 1)");
    assert.equals(ast.toTex(), "\\sqrt{\\frac{2}{1} + 1}");

    assert.end();
});
