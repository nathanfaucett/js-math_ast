var TexLexer = require("./lexer/TexLexer"),
    TexParser = require("./parser/TexParser");


module.exports = fromTex;


function fromTex(tex) {
    var lexer = new TexLexer(tex),
        parser = new TexParser(lexer.collect());

    return parser.parse();
}