var arrayFilter = require("@nathanfaucett/array-filter"),
    ast = require("../ast"),
    TOKENS = require("../lexer/TOKENS");


var ParserPrototype = Parser.prototype;


module.exports = Parser;


function Parser(tokens) {
    this.index = 0;
    this.tokens = arrayFilter(tokens, filterWhitespace);
}

ParserPrototype.parse = function() {
    return Parser_parseExpr(this);
};


function filterWhitespace(token) {
    return token.type !== TOKENS.WHITESPACE;
}

function Parser_peekToken(_this, offset) {
    return _this.tokens[_this.index + offset];
}

function Parser_consume(_this, offset) {
    _this.index += offset;
}

function Parser_nextToken(_this) {
    var token = Parser_peekToken(_this, 0);
    Parser_consume(_this, 1);
    return token;
}

function Parser_parsePrimaryExpr(_this) {
    var token = Parser_nextToken(_this);

    switch (token.type) {
        case TOKENS.NUMBER:
            return new ast.Number(token.value);
        case TOKENS.VARIABLE:
            return new ast.Variable(token.value);
        case TOKENS.IDENTIFIER:
            return Parser_parseIdentifierExpr(_this, token.value);
        case TOKENS.SYMBOL:
            switch (token.value) {
                case '|':
                    return Parser_parseGroupExpr(_this, '|', '|', false);
                case '(':
                    return Parser_parseGroupExpr(_this, '(', ')', false);
                case '{':
                    return Parser_parseGroupExpr(_this, '{', '}', false);
                case '-':
                    return new ast.UnaryOperation(token.value, Parser_parsePrimaryExpr(_this));
                default:
                    throw new Error("Invalid token " + JSON.stringify(token));
            }
            break;
        default:
            throw new Error("Invalid token " + JSON.stringify(token));
    }
}

function Parser_parseIdentifierExpr(_this, name) {
    var args = [],
        token = Parser_peekToken(_this, 0);

    if (token && token.type === TOKENS.SYMBOL && token.value === '(') {
        Parser_consume(_this, 1);

        while (true) {
            args.push(Parser_parseExpr(_this));
            token = Parser_nextToken(_this, 0);

            if (token && token.type === TOKENS.SYMBOL && token.value === ')') {
                break;
            }
        }
    }

    return new ast.Function(name, args);
}

function Parser_parseGroupExpr(_this, open, close, isArg) {
    var expr = Parser_parseExpr(_this),
        token = Parser_nextToken(_this);

    if (token && token.type === TOKENS.SYMBOL && token.value === close) {
        if (isArg) {
            return expr;
        } else {
            return new ast.Group(open, close, expr);
        }
    } else {
        throw new Error("Invalid token " + JSON.stringify(token));
    }
}

function Parser_parseMultExpr(_this) {
    var expr = Parser_parsePrimaryExpr(_this),
        token = Parser_peekToken(_this, 0),
        rhs, lhs;

    while (
        token && token.type === TOKENS.SYMBOL &&
        (token.value === '^' || token.value === '*' || token.value === '/')
    ) {
        Parser_consume(_this, 1);
        lhs = expr;
        rhs = Parser_parseMultExpr(_this);
        expr = new ast.BinaryOperation(token.value, lhs, rhs);
        token = Parser_peekToken(_this, 0);
    }

    return expr;
}

function Parser_parseExpr(_this) {
    var expr = Parser_parseMultExpr(_this),
        token = Parser_peekToken(_this, 0),
        rhs, lhs;

    while (
        token && token.type === TOKENS.SYMBOL &&
        (token.value === '+' || token.value === '-')
    ) {
        Parser_consume(_this, 1);
        lhs = expr;
        rhs = Parser_parseMultExpr(_this);
        expr = new ast.BinaryOperation(token.value, lhs, rhs);
        token = Parser_peekToken(_this, 0);
    }

    return expr;
}