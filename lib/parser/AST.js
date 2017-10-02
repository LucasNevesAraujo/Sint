'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Abstract Syntax Tree node
 */
var AST = exports.AST = function AST() {
  _classCallCheck(this, AST);
};

/**
 * Function call.
 *
 * @extends AST
 */


AST.displayName = 'AST';

var FunctionCall = exports.FunctionCall = function (_AST) {
  _inherits(FunctionCall, _AST);

  /**
   * Create a Function call object.
   * @param {string} [name] - Function name.
   * @param {array} [params] - Function parameters.
   */
  function FunctionCall(name, params) {
    _classCallCheck(this, FunctionCall);

    var _this = _possibleConstructorReturn(this, (FunctionCall.__proto__ || Object.getPrototypeOf(FunctionCall)).call(this));

    _this.name = name;
    _this.params = params;
    return _this;
  }

  return FunctionCall;
}(AST);

/**
 * Cell identifier.
 *
 * @extends AST
 */


FunctionCall.displayName = 'FunctionCall';

var CellIdentifier = exports.CellIdentifier = function (_AST2) {
  _inherits(CellIdentifier, _AST2);

  /**
   * Create a Cell identifier object.
   * @param {string} [name] - Function name.
   * @param {string} [sheet] - Sheet name.
   */
  function CellIdentifier(name) {
    var sheet = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

    _classCallCheck(this, CellIdentifier);

    var _this2 = _possibleConstructorReturn(this, (CellIdentifier.__proto__ || Object.getPrototypeOf(CellIdentifier)).call(this));

    _this2.name = name;
    _this2.sheet = sheet;
    return _this2;
  }

  /**
   * Get cell name (without dollar sign).
   * @return {string} Cell name.
   */


  _createClass(CellIdentifier, [{
    key: 'clean',
    value: function clean() {
      return this.name.replace(/\$/g, '');
    }
  }]);

  return CellIdentifier;
}(AST);

/**
 * Range reference.
 *
 * @extends AST
 */


CellIdentifier.displayName = 'CellIdentifier';

var RangeReference = exports.RangeReference = function (_AST3) {
  _inherits(RangeReference, _AST3);

  /**
   * Create a Cell identifier object.
   * @param {Token} [token] - Range token.
   * @param {string} [sheet] - Sheet name.
   */
  function RangeReference(token) {
    var sheet = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

    _classCallCheck(this, RangeReference);

    var _this3 = _possibleConstructorReturn(this, (RangeReference.__proto__ || Object.getPrototypeOf(RangeReference)).call(this));

    _this3.token = token;
    _this3.range = token.value;
    _this3.sheet = sheet;
    return _this3;
  }

  /**
   * Get Range pair
   * @return {array} Two CellIdentifier
   */


  _createClass(RangeReference, [{
    key: 'pair',
    value: function pair() {
      var pairs = this.range.split(':');

      return [new CellIdentifier(pairs[0]), new CellIdentifier(pairs[1])];
    }
  }]);

  return RangeReference;
}(AST);

/**
 * Binary Operator. A binary operator is an operator that operates on two operands.
 *
 * @extends AST
 */


RangeReference.displayName = 'RangeReference';

var BinOp = exports.BinOp = function (_AST4) {
  _inherits(BinOp, _AST4);

  /**
   * Create a Binary Operator.
   * @param {string} left - Left operand.
   * @param {Token} op - Operator.
   * @param {string} right - Right operand.
   */
  function BinOp(left, op, right) {
    _classCallCheck(this, BinOp);

    var _this4 = _possibleConstructorReturn(this, (BinOp.__proto__ || Object.getPrototypeOf(BinOp)).call(this));

    _this4.left = left;
    _this4.token = _this4.op = op;
    _this4.right = right;
    return _this4;
  }

  return BinOp;
}(AST);

/**
 * An AST node class to represent unary operators
 *
 * @extends AST
 */


BinOp.displayName = 'BinOp';

var UnaryOp = exports.UnaryOp = function (_AST5) {
  _inherits(UnaryOp, _AST5);

  /**
   * Create a Unary Operator.
   * @param {Token} op - Operator.
   * @param {AST} expr - Expression.
   */
  function UnaryOp(op, expr) {
    _classCallCheck(this, UnaryOp);

    var _this5 = _possibleConstructorReturn(this, (UnaryOp.__proto__ || Object.getPrototypeOf(UnaryOp)).call(this));

    _this5.token = _this5.op = op;
    _this5.expr = expr;
    return _this5;
  }

  return UnaryOp;
}(AST);

/**
 * An AST node class to represent postfix operators
 *
 * @extends AST
 */


UnaryOp.displayName = 'UnaryOp';

var PostfixOp = exports.PostfixOp = function (_AST6) {
  _inherits(PostfixOp, _AST6);

  /**
   * Create a Postfix Operator.
   * @param {Token} op - Operator.
   * @param {AST} expr - Expression.
   */
  function PostfixOp(op, expr) {
    _classCallCheck(this, PostfixOp);

    var _this6 = _possibleConstructorReturn(this, (PostfixOp.__proto__ || Object.getPrototypeOf(PostfixOp)).call(this));

    _this6.token = _this6.op = op;
    _this6.expr = expr;
    return _this6;
  }

  return PostfixOp;
}(AST);

/**
 * ArrayConstant represents an array.
 *
 * @extends AST
 */


PostfixOp.displayName = 'PostfixOp';

var ArrayConstant = exports.ArrayConstant = function (_AST7) {
  _inherits(ArrayConstant, _AST7);

  /**
   * Create a Array constant.
   * @param {array} value - List of items.
   */
  function ArrayConstant(value) {
    _classCallCheck(this, ArrayConstant);

    var _this7 = _possibleConstructorReturn(this, (ArrayConstant.__proto__ || Object.getPrototypeOf(ArrayConstant)).call(this));

    _this7.value = value;
    return _this7;
  }

  return ArrayConstant;
}(AST);

/**
 * NumberConstant represents Numbers.
 *
 * @extends AST
 */


ArrayConstant.displayName = 'ArrayConstant';

var NumberConstant = exports.NumberConstant = function (_AST8) {
  _inherits(NumberConstant, _AST8);

  /**
   * Create a Number constant.
   * @param {number} value - Integer or float value.
   */
  function NumberConstant(value) {
    _classCallCheck(this, NumberConstant);

    var _this8 = _possibleConstructorReturn(this, (NumberConstant.__proto__ || Object.getPrototypeOf(NumberConstant)).call(this));

    _this8.value = value;
    return _this8;
  }

  return NumberConstant;
}(AST);

/**
 * StringConstant represents Strings.
 *
 * @extends AST
 */


NumberConstant.displayName = 'NumberConstant';

var StringConstant = exports.StringConstant = function (_AST9) {
  _inherits(StringConstant, _AST9);

  /**
   * Create a String constant.
   * @param {string} value - String.
   */
  function StringConstant(value) {
    _classCallCheck(this, StringConstant);

    var _this9 = _possibleConstructorReturn(this, (StringConstant.__proto__ || Object.getPrototypeOf(StringConstant)).call(this));

    _this9.value = value;
    return _this9;
  }

  return StringConstant;
}(AST);

/**
 * BooleanConstant represents Booleans.
 *
 * @extends AST
 */


StringConstant.displayName = 'StringConstant';

var BooleanConstant = exports.BooleanConstant = function (_AST10) {
  _inherits(BooleanConstant, _AST10);

  /**
   * Create a Boolean constant.
   * @param {boolean} value - Boolean.
   */
  function BooleanConstant(value) {
    _classCallCheck(this, BooleanConstant);

    var _this10 = _possibleConstructorReturn(this, (BooleanConstant.__proto__ || Object.getPrototypeOf(BooleanConstant)).call(this));

    _this10.value = value;
    return _this10;
  }

  return BooleanConstant;
}(AST);

/**
 * ErrorConstant represents Error references.
 *
 * @extends AST
 */


BooleanConstant.displayName = 'BooleanConstant';

var ErrorConstant = exports.ErrorConstant = function (_AST11) {
  _inherits(ErrorConstant, _AST11);

  /**
   * Create a Error constant.
   * @param {string} [value] - Error description.
   */
  function ErrorConstant(value) {
    _classCallCheck(this, ErrorConstant);

    var _this11 = _possibleConstructorReturn(this, (ErrorConstant.__proto__ || Object.getPrototypeOf(ErrorConstant)).call(this));

    _this11.value = value;
    return _this11;
  }

  return ErrorConstant;
}(AST);

ErrorConstant.displayName = 'ErrorConstant';