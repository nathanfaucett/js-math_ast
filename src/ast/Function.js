var arrayMap = require("@nathanfaucett/array-map"),
    Node = require("./Node"),
    AST = require("./AST");


var FunctionPrototype;


module.exports = Function;


function Function(name, args) {

    Node.call(this, AST.FUNCTION);

    this.name = name;
    this.args = args;
}
Node.extend(Function);
FunctionPrototype = Function.prototype;

FunctionPrototype.toString = function() {
    switch (this.name) {
        case "frac":
            return this.args[0].toString() + " / " + this.args[1].toString();
        default:
            return this.name + "(" + arrayMap(this.args, nodeToString).join("") + ")";
    }
};

function nodeToString(node) {
    return node.toString();
}

FunctionPrototype.toTex = function() {
    return "\\" + this.name + arrayMap(this.args, nodeToTex).join("");
};

function nodeToTex(node) {
    return "{" + node.toTex() + "}";
}