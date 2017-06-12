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

NumberPrototype.toString = function() {
    return this.value;
};

NumberPrototype.toTex = NumberPrototype.toString;