var Node = require("./Node"),
    AST = require("./AST");


var VariablePrototype;


module.exports = Variable;


function Variable(name) {

    Node.call(this, AST.VARIABLE);

    this.name = name;
}
Node.extend(Variable);
VariablePrototype = Variable.prototype;

VariablePrototype.toString = function() {
    return this.name;
};

VariablePrototype.toTex = VariablePrototype.toString;