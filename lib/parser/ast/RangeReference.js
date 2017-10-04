'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _AST2 = require('./AST');

var _AST3 = _interopRequireDefault(_AST2);

var _CellIdentifier = require('./CellIdentifier');

var _CellIdentifier2 = _interopRequireDefault(_CellIdentifier);

var _Range = require('./../Range');

var _Range2 = _interopRequireDefault(_Range);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Range reference.
 *
 * @extends AST
 */
var RangeReference = function (_AST) {
    _inherits(RangeReference, _AST);

    /**
     * Create a Cell identifier object.
     * @param {Token} [token] - Range token.
     * @param {string} [sheet] - Sheet name.
     */
    function RangeReference(token) {
        var sheet = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

        _classCallCheck(this, RangeReference);

        var _this = _possibleConstructorReturn(this, (RangeReference.__proto__ || Object.getPrototypeOf(RangeReference)).call(this));

        _this.token = token;
        _this.rangeValue = token.value;
        _this.sheet = sheet;
        return _this;
    }

    /**
     * Get Range pair
     * @return {array} Two CellIdentifier
     */


    _createClass(RangeReference, [{
        key: 'pair',
        value: function pair() {
            var pairs = this.rangeValue.split(':');

            return [new _CellIdentifier2.default(pairs[0]), new _CellIdentifier2.default(pairs[1])];
        }

        /**
         * Get range information
         * @return {Range} Range object
         */

    }, {
        key: 'range',
        value: function range() {
            var pairs = this.pair();

            return new _Range2.default(pairs[0].position(), pairs[1].position());
        }
    }]);

    return RangeReference;
}(_AST3.default);

RangeReference.displayName = 'RangeReference';
exports.default = RangeReference;