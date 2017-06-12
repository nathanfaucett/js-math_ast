var ast = require("./ast"),
    Lexer = require("./lexer/Lexer"),
    Parser = require("./parser/Parser");


module.exports = fromTex;


function fromTex(tex) {
    var lexer = new Lexer(tex),
        tokens = lexer.collect(),
        parser = new Parser(tokens);

    if (tokens.length !== 0) {
        return parser.parse();
    } else {
        return new ast.Empty();
    }
}