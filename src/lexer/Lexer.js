var BaseLexer = require("@nathanfaucett/lexer"),
    readers = require("./readers");


module.exports = Lexer;


function Lexer(input) {
    BaseLexer.call(this, input);

    this.add(readers.number)
        .add(readers.symbols)
        .add(readers.identifier)
        .add(readers.variable)
        .add(readers.whitespace)
        .sort();
}
BaseLexer.extend(Lexer);