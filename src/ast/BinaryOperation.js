var Node = require("./Node"),
    AST = require("./AST");


var BinaryOperationPrototype;


module.exports = BinaryOperation;


function BinaryOperation(operation, left, right) {

    Node.call(this, AST.BINARY_OPERATION);

    this.operation = operation;
    this.left = left;
    this.right = right;
}
Node.extend(BinaryOperation);
BinaryOperationPrototype = BinaryOperation.prototype;

BinaryOperationPrototype.toString = function() {
    return (
        this.left.toString() +
        " " +
        this.operation +
        " " +
        this.right.toString()
    );
};

BinaryOperationPrototype.toTex = function() {
    switch (this.operation) {
        case '/':
            return "\\frac{" + this.left.toTex() + "}{" + this.right.toTex() + "}";
        default:
            return (
                this.left.toTex() +
                " " +
                this.operation +
                " " +
                this.right.toTex()
            );
    }
};