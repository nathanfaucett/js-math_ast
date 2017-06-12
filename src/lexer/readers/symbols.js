var Lexer = require("@nathanfaucett/lexer"),
    TOKENS = require("../TOKENS");


module.exports = symbols;


function symbols(input, state) {
    var ch = input.read(state);

    switch (ch) {
        case '+':
        case '-':
        case '*':
        case '|':
        case '{':
        case '}':
        case '(':
        case ')':
            return new Lexer.Token(TOKENS.SYMBOL, ch);
        default:
            return Lexer.NO_TOKEN;
    }
}
symbols.priority = 3;