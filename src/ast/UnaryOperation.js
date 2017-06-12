var Node = require("./Node"),
    AST = require("./AST");


var UnaryOperationPrototype;


module.exports = UnaryOperation;


function UnaryOperation(operation, expr) {

    Node.call(this, AST.UNARY_OPERATION);

    this.operation = operation;
    this.expr = expr;
}
Node.extend(UnaryOperation);
UnaryOperationPrototype = UnaryOperation.prototype;

UnaryOperationPrototype.equals = function(other) {
    return (
        this.type === other.type &&
        this.operation === other.operation &&
        this.expr.equals(other.expr)
    );
};

UnaryOperationPrototype.toString = function() {
    var expr = this.expr;

    return this.operation + (
        expr.type === AST.NUMBER || expr.type === AST.VARIABLE ?
        expr.toString() :
        "(" + expr.toString() + ")"
    );
};

UnaryOperationPrototype.toTex = function() {
    var expr = this.expr;

    return this.operation + (
        expr.type === AST.NUMBER || expr.type === AST.VARIABLE ?
        expr.toTex() :
        "(" + expr.toTex() + ")"
    );
};