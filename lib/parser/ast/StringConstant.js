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
 * StringConstant represents Strings.
 *
 * @extends AST
 */
var StringConstant = function (_AST) {
  _inherits(StringConstant, _AST);

  /**
   * Create a String constant.
   * @param {string} value - String.
   */
  function StringConstant(value) {
    _classCallCheck(this, StringConstant);

    var _this = _possibleConstructorReturn(this, (StringConstant.__proto__ || Object.getPrototypeOf(StringConstant)).call(this));

    _this.value = value;
    return _this;
  }

  return StringConstant;
}(_AST3.default);

StringConstant.displayName = 'StringConstant';
exports.default = StringConstant;