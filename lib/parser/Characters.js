'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Iterable list of characters.
 */
var Characters = function () {
    /**
    * Creates a Characters objects from text.
    * @param {string} [text] - The text source.
    */
    function Characters() {
        var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

        _classCallCheck(this, Characters);

        this.text = text;
    }

    /**
     * Advance to the next character.
     * @return {string} Next character.
     */


    _createClass(Characters, [{
        key: 'advance',
        value: function advance() {
            this.pointer++;

            return this.current;
        }

        /**
         * Peek the next character without advancing.
         * @return {string} Next character.
         */

    }, {
        key: 'isWhitespace',


        /**
         * Returns true if the current character is a white space.
         * @return {boolean} True if is a white space.
         */
        value: function isWhitespace() {
            return (/^\s+$/.test(this.current)
            );
        }

        /**
         * Returns true if the current character is alphabetic.
         * @return {boolean} True if is a alphabetic.
         */

    }, {
        key: 'isAlpha',
        value: function isAlpha() {
            return (/^[a-zA-Z]+$/.test(this.current)
            );
        }

        /**
         * Returns true if the current character is Unicode.
         * @return {boolean} True if is a non-ascii character.
         */

    }, {
        key: 'isUnicode',
        value: function isUnicode() {
            // https://stackoverflow.com/questions/2124010/grep-regex-to-match-non-ascii-characters
            return (/[^\x00-\x7F]+$/.test(this.current)
            ); // eslint-disable-line
        }

        /**
         * Returns true if the current character is a digit.
         * @return {boolean} True if is a digit.
         */

    }, {
        key: 'isDigit',
        value: function isDigit() {
            return (/^[0-9]+$/.test(this.current)
            );
        }

        /**
         * Returns true if the current character is a valid Identifier character.
         * @return {boolean} True if is a valid identifier.
         */

    }, {
        key: 'isIdentifier',
        value: function isIdentifier() {
            return this.isAlpha() || this.isUnicode() || this.isDigit() || /^[\_\$\.]+$/.test(this.current);
        }
    }, {
        key: 'peek',
        get: function get() {
            return this._text[this.pointer + 1];
        }

        /**
         * Returns true if pointer is equal or greater than text length.
         * @return {boolean} Did pointer reach the last position?
         */

    }, {
        key: 'end',
        get: function get() {
            return this.pointer >= this._text.length;
        }

        /**
         * Returns the first character of text.
         * @return {string} First text character.
         */

    }, {
        key: 'start',
        get: function get() {
            return this._text[0];
        }

        /**
         * Get current character
         * @readonly
         * @return {string} Current character.
         */

    }, {
        key: 'current',
        get: function get() {
            return this._text[this.pointer];
        }

        /**
         * Set a new text and set pointer to zero.
         * @param {string} [value] - Code content.
         */

    }, {
        key: 'text',
        set: function set(value) {
            this._text = String(value);
            this.pointer = 0;
        },
        get: function get() // eslint-disable-line require-jsdoc
        {
            return this._text;
        }
    }]);

    return Characters;
}();

Characters.displayName = 'Characters';
exports.default = Characters;