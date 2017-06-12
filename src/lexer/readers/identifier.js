var isAlphanumeric = require("@nathanfaucett/is_alphanumeric"),
    Lexer = require("@nathanfaucett/lexer"),
    TOKENS = require("../TOKENS");


module.exports = identifier;


function identifier(input, state) {
    var ch = input.read(state),
        string;

    if (isAlphanumeric(ch)) {
        string = ch;

        while (!input.done(state)) {
            ch = input.peek(state, 0);

            if (isAlphanumeric(ch)) {
                input.read(state);
                string += ch;
            } else {
                break;
            }
        }

        switch (string) {
            case "sqrt":
            case "log":
            case "mod":
                return new Lexer.Token(TOKENS.IDENTIFIER, string);
            default:
                return Lexer.NO_TOKEN;
        }
    } else {
        return Lexer.NO_TOKEN;
    }
}
identifier.priority = 3;