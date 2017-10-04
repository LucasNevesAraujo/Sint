'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _AST2 = require('./AST');

var _AST3 = _interopRequireDefault(_AST2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Binary Operator. A binary operator is an operator that operates on two operands.
 *
 * @extends AST
 */
var BinOp = function (_AST) {
  _inherits(BinOp, _AST);

  /**
   * Create a Binary Operator.
   * @param {string} left - Left operand.
   * @param {Token} op - Operator.
   * @param {string} right - Right operand.
   */
  function BinOp(left, op, right) {
    _classCallCheck(this, BinOp);

    var _this = _possibleConstructorReturn(this, (BinOp.__proto__ || Object.getPrototypeOf(BinOp)).call(this));

    _this.left = left;
    _this.token = _this.op = op;
    _this.right = right;
    return _this;
  }

  return BinOp;
}(_AST3.default);

BinOp.displayName = 'BinOp';
exports.default = BinOp;