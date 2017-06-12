var Node = require("./Node"),
    AST = require("./AST");


var EmptyPrototype;


module.exports = Empty;


function Empty() {
    Node.call(this, AST.EMPTY);
}
Node.extend(Empty);
EmptyPrototype = Empty.prototype;

EmptyPrototype.equals = function(other) {
    return (
        this.type === other.type
    );
};