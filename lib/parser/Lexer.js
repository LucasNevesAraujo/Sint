'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Constants = require('./../Constants');

var _Characters2 = require('./Characters');

var _Characters3 = _interopRequireDefault(_Characters2);

var _Token = require('./Token');

var _Token2 = _interopRequireDefault(_Token);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var START_CHAR = '=';
var DOLLAR_SIGN = '$';
var SINGLE_QUOTE = '\'';
var DOUBLE_QUOTE = '"';

// Error characteres
var HASH_SIGN = '#';
var EXCLAMATION_MARK = '!';
var QUESTION_MARK = '?';
var SLASH = '/';

// Returns true if it's a number or number string.
function isNumber(number) {
    return !isNaN(parseFloat(number)) && isFinite(number);
}

/**
 * A class to do Lexical analysis.
 *
 * @extends Characters
 */

var Lexer = function (_Characters) {
    _inherits(Lexer, _Characters);

    /**
    * Creates a Lexer.
    * @param {string} [text] - Code content.
    */
    function Lexer() {
        var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

        _classCallCheck(this, Lexer);

        return _possibleConstructorReturn(this, (Lexer.__proto__ || Object.getPrototypeOf(Lexer)).call(this, text));
    }

    /**
     * Skip white space characters
     */


    _createClass(Lexer, [{
        key: 'skipWhitespace',
        value: function skipWhitespace() {
            while (!this.end && this.isWhitespace()) {
                this.advance();
            }
        }

        /**
         * Returns all contents from text.
         * @return {string} Text contents.
         */

    }, {
        key: 'contents',
        value: function contents() {
            var result = '';

            while (!this.end) {
                result += this.current;
                this.advance();
            }

            return result;
        }

        /**
         * Returns a constant or EOF. Constants can be Strings, numbers and Booleans.
         * @return {Token} A Constant token.
         */

    }, {
        key: 'constant',
        value: function constant() {
            var isSingleQuoted = this.current === SINGLE_QUOTE;
            var result = void 0;

            if (isSingleQuoted) {
                this.advance();
                result = this.contents();

                return new _Token2.default(_Constants.TOKENS.STRING, String(result));
            }

            result = this.contents();
            if (result) {
                var lower = result.toUpperCase();
                var error = lower.trim();

                for (var key in _Constants.ERRORS) {
                    if (_Constants.ERRORS[key] === error) {
                        return new _Token2.default(_Constants.TOKENS.ERROR, error);
                    }
                }

                if (lower === 'TRUE') {
                    return new _Token2.default(_Constants.TOKENS.BOOLEAN, true);
                } else if (lower === 'FALSE') {
                    return new _Token2.default(_Constants.TOKENS.BOOLEAN, false);
                } else if (isNumber(result)) {
                    return new _Token2.default(_Constants.TOKENS.NUMBER, parseFloat(result));
                }

                return new _Token2.default(_Constants.TOKENS.STRING, String(result));
            }

            return new _Token2.default(_Constants.TOKENS.EOL);
        }

        /**
         * Returns a digit
         * @return {string} A Number string.
         */

    }, {
        key: 'digit',
        value: function digit() {
            var result = '';

            while (this.isDigit()) {
                result += this.current;
                this.advance();
            }

            return result;
        }

        /**
         * Returns a number token or a range (e.g. 1:3) token.
         * @return {Token} A Number or Range token.
         */

    }, {
        key: 'number',
        value: function number() {
            var result = this.digit();

            if (this.current === '.') {
                this.advance(); // Skip dot sign.
                result = result + '.' + this.digit();
            } else if (this.current === ':') {
                this.advance(); // Skip colon sign.
                result = result + ':' + this.digit();

                return new _Token2.default(_Constants.TOKENS.RANGE, result);
            }
            result = parseFloat(result);

            return new _Token2.default(_Constants.TOKENS.NUMBER, result);
        }

        /**
         * Returns a identifier, that can be a Function name, cell reference or range.
         * @return {string} An Identifier.
         */

    }, {
        key: 'name',
        value: function name() {
            var result = '';

            while (!this.end && this.isIdentifier()) {
                result += this.current;
                this.advance();
            }

            return result.toUpperCase();
        }

        /**
         * Returns a identifier or range token.
         * @return {Token} An ID or RANGE token.
         */

    }, {
        key: 'identifier',
        value: function identifier() {
            var result = this.name();
            var isBoolean = result === 'TRUE' || result === 'FALSE';

            // Checks if its not a function, e.g. TRUE() or FALSE().
            if (isBoolean) {
                this.skipWhitespace();
                if (this.current !== '(') {
                    return new _Token2.default(_Constants.TOKENS.BOOLEAN, result === 'TRUE');
                }
            }

            // Checks if it's a Range
            if (this.current === ':') {
                // Skip the colon mark.
                this.advance();

                var first = result;
                var last = this.name();

                result = first + ':' + last;

                return new _Token2.default(_Constants.TOKENS.RANGE, result);
            }

            // Checks if it's a Sheet
            if (this.current === '!') {
                // Skip the exclamation mark.
                this.advance();

                return new _Token2.default(_Constants.TOKENS.SHEET, result);
            }

            return new _Token2.default(_Constants.TOKENS.ID, result);
        }

        /**
         * Returns a string.
         * @param {string} [end] - the End character.
         * @return {string} The whole string.
         */

    }, {
        key: 'literal',
        value: function literal() {
            var end = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DOUBLE_QUOTE;

            var result = '';

            // Skip the first quote sign.
            this.advance();
            while (!this.end && this.current !== end) {
                result += this.current;
                this.advance();
            }

            // Skip the last quote sign.
            this.advance();

            return String(result);
        }

        /**
         * Returns a string
         * @return {Token} A String token.
         */

    }, {
        key: 'string',
        value: function string() {
            var result = this.literal(DOUBLE_QUOTE);

            return new _Token2.default(_Constants.TOKENS.STRING, result);
        }

        /**
         * Returns a sheet token.
         * @throws Will throw an error if it's an empty sheet.
         * @return {Token} A ID token.
         */

    }, {
        key: 'sheet',
        value: function sheet() {
            var result = this.literal(SINGLE_QUOTE).trim().toUpperCase();

            if (!result.length) {
                throw new Error('Empty sheet name');
            }

            // Skip exclamation point.
            this.advance();

            return new _Token2.default(_Constants.TOKENS.SHEET, result);
        }

        /**
         * Returns a Error string.
         * @throws Will throw an error if it's not a valid Error.
         * @return {Token} A Error token.
         */

    }, {
        key: 'error',
        value: function error() {
            var finalChars = [EXCLAMATION_MARK, QUESTION_MARK, SLASH];
            var result = '';

            while (!this.end && !finalChars.includes(this.current)) {
                result += this.current;
                this.advance();
            }

            var isSlash = this.current === SLASH;

            result += this.current;
            this.advance();

            if (isSlash) {
                switch (this.current) {
                    // #DIV/0!
                    case '0':
                        result += this.current;
                        this.advance();
                        result += this.current;
                        this.advance();
                        break;

                    // #N/A
                    case 'a':
                    case 'A':
                        result += this.current;
                        this.advance();
                        break;
                }
            }

            result = result.toUpperCase();
            for (var key in _Constants.ERRORS) {
                if (_Constants.ERRORS[key] === result) {
                    return new _Token2.default(_Constants.TOKENS.ERROR, result);
                }
            }

            return result;
        }

        /**
         * Returns a operator
         * @return {Token} A String token.
         */

    }, {
        key: 'operator',
        value: function operator() {
            var result = this.current;
            var next = this.advance();

            if (result === '<' && next === '=') {
                result += this.current;
                this.advance();
            } else if (result === '>' && next === '=') {
                result += this.current;
                this.advance();
            } else if (result === '<' && next === '>') {
                result += this.current;
                this.advance();
            }

            return new _Token2.default(_Constants.OPERATORS[result], result);
        }

        /**
         * Return the next token and reset pointer.
         * @return {Token} A Token.
         */

    }, {
        key: 'peek',
        value: function peek() {
            var oldPointer = this.pointer;
            var token = this.next();

            this.pointer = oldPointer;

            return token;
        }

        /**
         * Return the next token for a formula
         * @throws Will throw an error if is a invalid character.
         * @return {Token} A Token.
         */

    }, {
        key: '_nextToken',
        value: function _nextToken() {
            // If it's the first character, skip it.
            if (this.pointer === 0) {
                this.advance();

                return new _Token2.default(_Constants.TOKENS.EQ, START_CHAR);
            }

            while (!this.end) {
                // While is Whitespace, skip.
                if (this.isWhitespace()) {
                    this.skipWhitespace();
                }

                // Get numbers
                if (this.isDigit()) {
                    return this.number();
                }

                // Get identifier
                if (this.isAlpha() || this.current === DOLLAR_SIGN) {
                    return this.identifier();
                }

                // Get Strings
                if (this.current === DOUBLE_QUOTE) {
                    return this.string();
                }

                // Get Sheets
                if (this.current === SINGLE_QUOTE) {
                    return this.sheet();
                }

                // Get Error
                if (this.current === HASH_SIGN) {
                    return this.error();
                }

                // Get Operators
                if (this.current in _Constants.OPERATORS) {
                    return this.operator();
                }

                throw new SyntaxError('Invalid character "' + this.current + '"');
            }

            return new _Token2.default(_Constants.TOKENS.EOL);
        }

        /**
         * Return the next token
         * @return {Token} A Token.
         */

    }, {
        key: 'next',
        value: function next() {
            // Check if starts with "=".
            if (this.start === START_CHAR) {
                return this._nextToken();
            }

            // Return a String, Number or Boolean
            return this.constant();
        }
    }]);

    return Lexer;
}(_Characters3.default);

Lexer.displayName = 'Lexer';
exports.default = Lexer;