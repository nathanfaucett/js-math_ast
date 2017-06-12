var isNumeric = require("@nathanfaucett/is_numeric"),
    Lexer = require("@nathanfaucett/lexer"),
    TOKENS = require("../TOKENS");


module.exports = number;


function number(input, state) {
    var ch = input.read(state),
        dotRead = ch === '.',
        string;

    if (isNumeric(ch) || dotRead) {
        if (dotRead) {
            string = "0.";
        } else {
            string = ch;
        }

        while (!input.done(state)) {
            ch = input.peek(state, 0);

            if (ch === '.') {
                if (dotRead) {
                    break;
                } else {
                    dotRead = true;
                    input.read(state);
                    string += ch;
                }
            } else if (isNumeric(ch)) {
                input.read(state);
                string += ch;
            } else {
                break;
            }
        }

        return new Lexer.Token(TOKENS.NUMBER, string);
    } else {
        return Lexer.NO_TOKEN;
    }
}
number.priority = 4;