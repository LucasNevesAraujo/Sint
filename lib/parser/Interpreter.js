'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Lexer = require('./Lexer');

var _Lexer2 = _interopRequireDefault(_Lexer);

var _Parser = require('./Parser');

var _Parser2 = _interopRequireDefault(_Parser);

var _DataGrid = require('./DataGrid');

var _DataGrid2 = _interopRequireDefault(_DataGrid);

var _AST = require('./AST');

var _Constants = require('./../Constants');

var _NodeVisitor2 = require('./NodeVisitor');

var _NodeVisitor3 = _interopRequireDefault(_NodeVisitor2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Execute an AST.
 * @todo Implement promises as return from function calls.
 * @todo Implement error handling.
 * @todo Implement worksheet data structure.
 */
var Interpreter = function (_NodeVisitor) {
    _inherits(Interpreter, _NodeVisitor);

    /**
     * Create a Interpreter
     * @param {DataGrid} [data] - Data object.
     * @param {object}   [list] - List of functions.
     */
    function Interpreter() {
        var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
        var list = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

        _classCallCheck(this, Interpreter);

        var _this = _possibleConstructorReturn(this, (Interpreter.__proto__ || Object.getPrototypeOf(Interpreter)).call(this));

        _this.data = data ? data : new _DataGrid2.default();
        _this.functions = list ? list : _Constants.FUNCTIONS;
        return _this;
    }

    /**
     * Visit a FunctionCall object.
     * @throws Will throw an error if function doesn't exists.
     * @param {AST} [node] - The tree or node.
     * @return {*} Result of operation.
     */


    _createClass(Interpreter, [{
        key: 'visitFunctionCall',
        value: function visitFunctionCall(node) {
            var name = node.name;
            var fn = this.functionByName(name);

            if (fn && typeof fn === 'function') {
                var args = [];

                for (var index in node.params) {
                    var arg = node.params[index];

                    args.push(this.visit(arg));
                }

                return fn.apply(null, args);
            }

            throw new Error('Function "' + name + '" doesn\'t exists.');
        }

        /**
         * Visit a CellIdentifier object
         * @param {AST} [node] - The tree or node.
         * @return {*}           Cell value or null.
         */

    }, {
        key: 'visitCellIdentifier',
        value: function visitCellIdentifier(node) {
            if (this.data) {
                return this.data.getValue(node);
            }

            return null;
        }

        /**
         * Visit a RangeReference object
         * @param {AST} [node] - The tree or node.
         * @return {array}       Range as array.
         */

    }, {
        key: 'visitRangeReference',
        value: function visitRangeReference(node) {
            if (this.data) {
                return this.data.getRange(node);
            }

            return null;
        }

        /**
         * Visit a BinOp object
         * @param {AST} [node] - The tree or node.
         * @return {*} Result of operation.
         */

    }, {
        key: 'visitBinOp',
        value: function visitBinOp(node) {
            var sign = node.op.value;
            var operator = _Constants.OP_FUNCTIONS[sign];

            if (operator) {
                return operator(this.visit(node.left), this.visit(node.right));
            }

            return null;
        }

        /**
         * Visit a UnaryOp object
         * @param {AST} [node] - The tree or node.
         * @return {*} Result of operation.
         */

    }, {
        key: 'visitUnaryOp',
        value: function visitUnaryOp(node) {
            if (node.op.type === _Constants.TOKENS.MINUS) {
                return -this.visit(node.expr);
            }

            return +this.visit(node.expr); // eslint-disable-line no-implicit-coercion
        }

        /**
         * Visit a PostfixOp object
         * @param {AST} [node] - The tree or node.
         * @return {*} Result of operation.
         */

    }, {
        key: 'visitPostfixOp',
        value: function visitPostfixOp(node) {
            return Number(this.visit(node.expr) / 100);
        }

        /**
         * Visit a ArrayConstant object
         * @param {AST} [node] - The tree or node.
         * @return {number} Node value.
         */

    }, {
        key: 'visitArrayConstant',
        value: function visitArrayConstant(node) {
            if (!Array.isArray(node.value)) {
                return [];
            }

            var columns = node.value;
            var constant = [];
            var column = [];
            var row = [];

            for (var i in columns) {
                column = columns[i];
                constant[i] = [];
                for (var j in column) {
                    row = column[j];
                    constant[i][j] = this.visit(row);
                }
            }

            return constant;
        }

        /**
         * Visit a NumberConstant object
         * @param {AST} [node] - The tree or node.
         * @return {number} Node value.
         */

    }, {
        key: 'visitNumberConstant',
        value: function visitNumberConstant(node) {
            return node.value;
        }

        /**
         * Visit a StringConstant object
         * @param {AST} [node] - The tree or node.
         * @return {string} Node value.
         */

    }, {
        key: 'visitStringConstant',
        value: function visitStringConstant(node) {
            return node.value;
        }

        /**
         * Visit a BooleanConstant object
         * @param {AST} [node] - The tree or node.
         * @return {boolean} Node value.
         */

    }, {
        key: 'visitBooleanConstant',
        value: function visitBooleanConstant(node) {
            return node.value;
        }

        /**
         * Visit a ErrorConstant object
         * @param {AST} [node] - The tree or node.
         * @return {null} Node value.
         */

    }, {
        key: 'visitErrorConstant',
        value: function visitErrorConstant(node) {
            return node.value;
        }

        /**
         * Return a function from a list.
         * @param {string} [name] - Function name.
         * @return {Function} The function.
         */

    }, {
        key: 'functionByName',
        value: function functionByName(name) {
            var fns = this.functions;

            return fns[name];
        }

        /**
         * Add more functions to the function list.
         * @param  {object} [list] - Pairs of name : function.
         * @return {object} Function list.
         */

    }, {
        key: 'addFunctions',
        value: function addFunctions(list) {
            this.functions = Object.assign(this.functions, list);

            return this.functions;
        }

        /**
         * Set functions.
         * @param  {object} [list] - Pairs of name : function.
         */

    }, {
        key: 'execute',


        /**
         * Execute a AST or parse and then execute a code.
         * @throws Will throw an error if is a invalid code.
         * @param {string|AST} [source] - Source code or AST.
         * @return {*}                    The result of the code.
         */
        value: function execute(source) {
            if (typeof source === 'string') {
                var lexer = new _Lexer2.default(source);
                var parser = new _Parser2.default(lexer);
                var tree = parser.parse();

                return this.execute(tree);
            } else if (source instanceof _AST.AST) {
                return this.visit(source);
            }

            return null;
        }

        /**
         * Execute a AST or parse and then execute a code.
         * @throws Will throw an error if is a invalid code.
         * @param {string|AST} [source] - Source code or AST.
         * @param {DataGrid}   [data]   - Data object.
         * @return {*}                    The result of the code.
         */

    }, {
        key: 'run',
        value: function run() {
            var source = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
            var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

            if (data !== null) {
                this.data = data;
            }

            return this.execute(source);
        }
    }, {
        key: 'functions',
        set: function set(list) {
            this._functions = list;
        }

        /**
         * Return functions.
         * @return {object} Function list.
         */
        ,
        get: function get() {
            return this._functions;
        }
    }]);

    return Interpreter;
}(_NodeVisitor3.default);

Interpreter.displayName = 'Interpreter';
exports.default = Interpreter;