var Node = require("./Node"),
    AST = require("./AST");


var NumberPrototype;


module.exports = Number;


function Number(value) {

    Node.call(this, AST.NUMBER);

    this.value = value;
}
Node.extend(Number);
NumberPrototype = Number.prototype;

NumberPrototype.equals = function(other) {
    return (
        this.type === other.type &&
        this.value === other.value
    );
};

NumberPrototype.toString = function() {
    return this.value;
};

NumberPrototype.toTex = NumberPrototype.toString;
