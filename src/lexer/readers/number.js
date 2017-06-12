var isNumeric = require("@nathanfaucett/is_numeric"),
    Lexer = require("@nathanfaucett/lexer"),
    TOKENS = require("../TOKENS");


module.exports = number;


function number(input, state) {
    var ch = input.read(state),
        nextCh = input.peek(state, 0),
        dotRead = ch === '.',
        negRead = ch === '-' && isNumeric(nextCh),
        string;

    if (isNumeric(ch) || dotRead || negRead) {
        if (dotRead) {
            string = "0.";
        } else if (negRead) {
            input.read(state);
            string = '-' + nextCh;
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
number.priority = 2;