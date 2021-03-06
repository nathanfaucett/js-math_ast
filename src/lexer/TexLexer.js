var BaseLexer = require("@nathanfaucett/lexer"),
    readers = require("./readers");


module.exports = TexLexer;


function TexLexer(input) {
    BaseLexer.call(this, input);

    this.add(readers.number)
        .add(readers.symbols)
        .add(readers.texIdentifier)
        .add(readers.variable)
        .add(readers.whitespace)
        .sort();
}
BaseLexer.extend(TexLexer);