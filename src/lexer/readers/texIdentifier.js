var isAlphanumeric = require("@nathanfaucett/is_alphanumeric"),
    Lexer = require("@nathanfaucett/lexer"),
    TOKENS = require("../TOKENS");


module.exports = texIdentifier;


function texIdentifier(input, state) {
    var ch = input.read(state),
        string;

    if (ch === '\\') {
        string = "";

        while (!input.done(state)) {
            ch = input.peek(state, 0);

            if (isAlphanumeric(ch)) {
                input.read(state);
                string += ch;
            } else {
                break;
            }
        }

        return new Lexer.Token(TOKENS.IDENTIFIER, string);
    } else {
        return Lexer.NO_TOKEN;
    }
}
texIdentifier.priority = 2;
