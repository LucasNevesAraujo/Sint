"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * A Lexical token.
 */
var Token =
/**
* Creates a Token.
* @param {string} type - Token Type.
* @param {string} value - Token value.
*/
function Token(type) {
    var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

    _classCallCheck(this, Token);

    this.type = type;
    this.value = value;
};

Token.displayName = "Token";
exports.default = Token;