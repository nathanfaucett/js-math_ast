var Lexer = require("@nathanfaucett/lexer"),
    readers = require("./readers");


module.exports = TexLexer;


function TexLexer(input) {
    Lexer.call(this, input);

    this.add(readers.number)
        .add(readers.symbols)
        .add(readers.texIdentifier)
        .add(readers.variable)
        .add(readers.whitespace)
        .sort();
}
Lexer.extend(TexLexer);