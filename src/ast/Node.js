var inherits = require("@nathanfaucett/inherits");


module.exports = Node;


function Node(type) {
    this.type = type;
}

Node.extend = function(Child) {
    inherits(Child, this);
    return Child;
};
