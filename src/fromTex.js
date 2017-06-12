var ast = require("./ast"),
    TexLexer = require("./lexer/TexLexer"),
    TexParser = require("./parser/TexParser");


module.exports = fromTex;


function fromTex(tex) {
    var lexer = new TexLexer(tex),
        tokens = lexer.collect(),
        parser = new TexParser(tokens);

    if (tokens.length !== 0) {
        return parser.parse();
    } else {
        return new ast.Empty();
    }
}