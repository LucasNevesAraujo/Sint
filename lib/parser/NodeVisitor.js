"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Node visitor is a walker for the abstract sysntax tree.
 */
var NodeVisitor = function () {
    function NodeVisitor() {
        _classCallCheck(this, NodeVisitor);
    }

    _createClass(NodeVisitor, [{
        key: "visit",

        /**
         * Visit all nodes of a tree.
         * @param {AST} [node] - The tree or node.
         * @return {*} The result of visiting all nodes.
         */
        value: function visit(node) {
            var methodName = void 0;
            var visitor = void 0;

            if (node) {
                methodName = "visit" + node.constructor.displayName;
                visitor = this[methodName];
            }

            if (!visitor) {
                throw new Error("No " + methodName + " method");
            }

            return visitor.call(this, node);
        }
    }]);

    return NodeVisitor;
}();

NodeVisitor.displayName = "NodeVisitor";
exports.default = NodeVisitor;