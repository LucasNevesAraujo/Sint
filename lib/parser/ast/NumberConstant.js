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
 * NumberConstant represents Numbers.
 *
 * @extends AST
 */
var NumberConstant = function (_AST) {
  _inherits(NumberConstant, _AST);

  /**
   * Create a Number constant.
   * @param {number} value - Integer or float value.
   */
  function NumberConstant(value) {
    _classCallCheck(this, NumberConstant);

    var _this = _possibleConstructorReturn(this, (NumberConstant.__proto__ || Object.getPrototypeOf(NumberConstant)).call(this));

    _this.value = value;
    return _this;
  }

  return NumberConstant;
}(_AST3.default);

NumberConstant.displayName = 'NumberConstant';
exports.default = NumberConstant;