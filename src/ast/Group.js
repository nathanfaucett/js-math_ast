var Node = require("./Node"),
    AST = require("./AST");


var GroupPrototype;


module.exports = Group;


function Group(open, close, expr) {

    Node.call(this, AST.GROUP);

    this.open = open;
    this.close = close;
    this.expr = expr;
}
Node.extend(Group);
GroupPrototype = Group.prototype;

GroupPrototype.equals = function(other) {
    return (
        this.type === other.type &&
        this.expr.equals(other.expr)
    );
};

GroupPrototype.toString = function() {
    return this.open + this.expr.toString() + this.close;
};

GroupPrototype.toTex = function() {
    return this.open + this.expr.toTex() + this.close;
};