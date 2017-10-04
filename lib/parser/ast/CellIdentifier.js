'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _AST2 = require('./AST');

var _AST3 = _interopRequireDefault(_AST2);

var _Position = require('./../Position');

var _Position2 = _interopRequireDefault(_Position);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Cell identifier.
 *
 * @extends AST
 */
var CellIdentifier = function (_AST) {
    _inherits(CellIdentifier, _AST);

    /**
     * Create a Cell identifier object.
     * @param {string} [name] - Function name.
     * @param {string} [sheet] - Sheet name.
     */
    function CellIdentifier(name) {
        var sheet = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

        _classCallCheck(this, CellIdentifier);

        var _this = _possibleConstructorReturn(this, (CellIdentifier.__proto__ || Object.getPrototypeOf(CellIdentifier)).call(this));

        _this.name = name;
        _this.sheet = sheet;
        return _this;
    }

    /**
     * Get cell name (without dollar sign).
     * @return {string} Cell name.
     */


    _createClass(CellIdentifier, [{
        key: 'clean',
        value: function clean() {
            return this.name.toUpperCase().replace(/\$/g, '');
        }

        /**
         * Get cell column and row numbers.
         * @return {Position} Cell position.
         */

    }, {
        key: 'position',
        value: function position() {
            var ref = this.clean();
            var columnString = ref.replace(/[^a-z]/gi, '');
            var column = CellIdentifier.toDecimal(columnString);
            var rowString = ref.replace(/[^0-9]/g, '');
            var row = parseInt(rowString, 10);

            return new _Position2.default(column, row);
        }

        /**
         * From Column string to number. Example: AA => 27
         * Based on: https://stackoverflow.com/questions/12699030/implement-numbering-scheme-like-a-b-c-aa-ab-aaa-similar-to-converting-a-num
         * @param {string} str - Column string
         * @return {number} Column number
         */

    }], [{
        key: 'toDecimal',
        value: function toDecimal(str) {
            var decimal = 0;
            var letters = str.toUpperCase().split(new RegExp());

            for (var i = letters.length - 1; i >= 0; i--) {
                decimal += (letters[i].charCodeAt(0) - 64) * Math.pow(26, letters.length - (i + 1));
            }

            return decimal;
        }

        /**
         * From Column number to string. Example: 27 => AA
         * Based on: https://stackoverflow.com/questions/12699030/implement-numbering-scheme-like-a-b-c-aa-ab-aaa-similar-to-converting-a-num
         * @param {number} value - Column number
         * @return {string} Column string
         */

    }, {
        key: 'toLetters',
        value: function toLetters(value) {
            var digits = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
            var result = [];

            value = value - 1;
            if (value === 0) {
                return digits[0];
            }

            while (value >= 0) {
                result.unshift(digits[value % 26]);
                value = Math.floor(value / 26) - 1;
            }

            return result.join('');
        }
    }]);

    return CellIdentifier;
}(_AST3.default);

CellIdentifier.displayName = 'CellIdentifier';
exports.default = CellIdentifier;