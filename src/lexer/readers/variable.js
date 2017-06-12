var isAlphanumeric = require("@nathanfaucett/is_alphanumeric"),
    Lexer = require("@nathanfaucett/lexer"),
    TOKENS = require("../TOKENS");


module.exports = variable;


function variable(input, state) {
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

        return new Lexer.Token(TOKENS.VARIABLE, string);
    } else {
        return Lexer.NO_TOKEN;
    }
}
variable.priority = 5;