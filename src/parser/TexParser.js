var arrayFilter = require("@nathanfaucett/array-filter"),
    ast = require("../ast"),
    TOKENS = require("../lexer/TOKENS");


var TexParserPrototype = TexParser.prototype;


module.exports = TexParser;


function TexParser(tokens) {
    this.index = 0;
    this.tokens = arrayFilter(tokens, filterWhitespace);
}

TexParserPrototype.parse = function() {
    return TexParser_parseExpr(this);
};


function filterWhitespace(token) {
    return token.type !== TOKENS.WHITESPACE;
}

function TexParser_peekToken(_this, offset) {
    return _this.tokens[_this.index + offset];
}

function TexParser_consume(_this, offset) {
    _this.index += offset;
}

function TexParser_nextToken(_this) {
    var token = TexParser_peekToken(_this, 0);
    TexParser_consume(_this, 1);
    return token;
}

function TexParser_parsePrimaryExpr(_this) {
    var token = TexParser_nextToken(_this);

    switch (token.type) {
        case TOKENS.NUMBER:
            return new ast.Number(token.value);
        case TOKENS.VARIABLE:
            return new ast.Variable(token.value);
        case TOKENS.IDENTIFIER:
            return TexParser_parseTexIdentifierExpr(_this, token.value);
        case TOKENS.SYMBOL:
            switch (token.value) {
                case '|':
                    return TexParser_parseGroupExpr(_this, '|');
                case '(':
                    return TexParser_parseGroupExpr(_this, ')');
                case '{':
                    return TexParser_parseGroupExpr(_this, '}');
                default:
                    throw new Error("Invalid token " + token);
            }
            break;
        default:
            throw new Error("Invalid token " + token);
    }
}

function TexParser_parseTexIdentifierExpr(_this, name) {
    var args = [],
        token = TexParser_peekToken(_this, 0);

    while (token && token.type === TOKENS.SYMBOL && token.value === '{') {
        TexParser_consume(_this, 1);
        args.push(TexParser_parseGroupExpr(_this, '}'));
        token = TexParser_peekToken(_this, 0);
    }

    switch (name) {
        case "frac":
            if (args.length === 2) {
                return new ast.BinaryOperation('/', args[0], args[1]);
            } else {
                throw new Error("Invalid frac function number of arguments should be 2");
            }
            break;
        default:
            return new ast.Function(name, args);
    }
}

function TexParser_parseGroupExpr(_this, end) {
    var expr = TexParser_parseExpr(_this),
        token = TexParser_nextToken(_this);

    if (token && token.type === TOKENS.SYMBOL && token.value === end) {
        return expr;
    } else {
        throw new Error("Invalid token " + token);
    }
}

function TexParser_parseMultExpr(_this) {
    var expr = TexParser_parsePrimaryExpr(_this),
        token = TexParser_peekToken(_this, 0),
        rhs, lhs;

    while (
        token && token.type === TOKENS.SYMBOL &&
        (token.value === '^' || token.value === '*' || token.value === '/')
    ) {
        TexParser_consume(_this, 1);
        lhs = expr;
        rhs = TexParser_parseMultExpr(_this);
        expr = new ast.BinaryOperation(token.value, lhs, rhs);
        token = TexParser_peekToken(_this, 0);
    }

    return expr;
}

function TexParser_parseExpr(_this) {
    var expr = TexParser_parseMultExpr(_this),
        token = TexParser_peekToken(_this, 0),
        rhs, lhs;

    while (
        token && token.type === TOKENS.SYMBOL &&
        (token.value === '+' || token.value === '-')
    ) {
        TexParser_consume(_this, 1);
        lhs = expr;
        rhs = TexParser_parseMultExpr(_this);
        expr = new ast.BinaryOperation(token.value, lhs, rhs);
        token = TexParser_peekToken(_this, 0);
    }

    return expr;
}
