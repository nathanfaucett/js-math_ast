var tape = require("tape"),
    math = require("..");


var TexLexer = math.TexLexer;


tape("TexLexer", function(assert) {
    var lexer = new TexLexer("\\sqrt{\\frac{2}{1} + 1}");

    assert.deepEquals(lexer.collect(), [{
            type: "TOKENS.IDENTIFIER",
            value: "sqrt",
            meta: null
        },
        {
            type: "TOKENS.SYMBOL",
            value: "{",
            meta: null
        },
        {
            type: "TOKENS.IDENTIFIER",
            value: "frac",
            meta: null
        },
        {
            type: "TOKENS.SYMBOL",
            value: "{",
            meta: null
        },
        {
            type: "TOKENS.NUMBER",
            value: "2",
            meta: null
        },
        {
            type: "TOKENS.SYMBOL",
            value: "}",
            meta: null
        },
        {
            type: "TOKENS.SYMBOL",
            value: "{",
            meta: null
        },
        {
            type: "TOKENS.NUMBER",
            value: "1",
            meta: null
        },
        {
            type: "TOKENS.SYMBOL",
            value: "}",
            meta: null
        },
        {
            type: "TOKENS.WHITESPACE",
            value: " ",
            meta: null
        },
        {
            type: "TOKENS.SYMBOL",
            value: "+",
            meta: null
        },
        {
            type: "TOKENS.WHITESPACE",
            value: " ",
            meta: null
        },
        {
            type: "TOKENS.NUMBER",
            value: "1",
            meta: null
        },
        {
            type: "TOKENS.SYMBOL",
            value: "}",
            meta: null
        }
    ]);

    assert.end();
});