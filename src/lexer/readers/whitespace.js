var isWhitespace = require("@nathanfaucett/is_whitespace"),
    Lexer = require("@nathanfaucett/lexer"),
    TOKENS = require("../TOKENS");


module.exports = whitespace;


function whitespace(input, state) {
    var ch = input.read(state),
        string;

    if (isWhitespace(ch)) {
        string = ch;

        while (!input.done(state)) {
            ch = input.peek(state, 0);

            if (isWhitespace(ch)) {
                input.read(state);
                string += ch;
            } else {
                break;
            }
        }

        return new Lexer.Token(TOKENS.WHITESPACE, string);
    } else {
        return Lexer.NO_TOKEN;
    }
}
whitespace.priority = 1;