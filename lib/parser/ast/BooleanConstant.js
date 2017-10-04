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
 * BooleanConstant represents Booleans.
 *
 * @extends AST
 */
var BooleanConstant = function (_AST) {
  _inherits(BooleanConstant, _AST);

  /**
   * Create a Boolean constant.
   * @param {boolean} value - Boolean.
   */
  function BooleanConstant(value) {
    _classCallCheck(this, BooleanConstant);

    var _this = _possibleConstructorReturn(this, (BooleanConstant.__proto__ || Object.getPrototypeOf(BooleanConstant)).call(this));

    _this.value = value;
    return _this;
  }

  return BooleanConstant;
}(_AST3.default);

BooleanConstant.displayName = 'BooleanConstant';
exports.default = BooleanConstant;