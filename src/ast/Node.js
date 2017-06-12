var inherits = require("@nathanfaucett/inherits");


var NodePrototype;


module.exports = Node;


function Node(type) {
    this.type = type;
}

Node.extend = function(Child) {
    inherits(Child, this);
    return Child;
};

NodePrototype = Node.prototype;


NodePrototype.toString = function() {
    return "";
};

NodePrototype.toLex = NodePrototype.toString;