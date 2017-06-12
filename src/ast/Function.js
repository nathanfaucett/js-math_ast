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

FunctionPrototype.equals = function(other) {
    var argsEqual = true,
        thisArgs = this.args,
        otherArgs = other.args,
        length = thisArgs.length,
        i, il;

    if (length === otherArgs.length) {
        i = -1;
        il = length - 1;

        while (i++ < il) {
            if (!thisArgs[i].equals(otherArgs[i])) {
                argsEqual = false;
                break;
            }
        }
    } else {
        argsEqual = false;
    }

    return (
        this.type === other.type &&
        this.name === other.name &&
        argsEqual
    );
};

FunctionPrototype.toString = function() {
    switch (this.name) {
        case "frac":
            return this.args[0].toString() + " / " + this.args[1].toString();
        default:
            return this.name + "(" + arrayMap(this.args, nodeToString).join(", ") + ")";
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