'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.FUNCTIONS = exports.OP_FUNCTIONS = exports.OPERATORS = exports.ERRORS = exports.TOKENS = undefined;

var _functions = require('./parser/functions');

/**
 * Token list
 *
 * @static
 * @constant
 * @type {object}
 * @property {string} EOL - End of line.
 * @property {string} NUMBER - Number constant.
 * @property {string} STRING - String constant.
 * @property {string} BOOLEAN - Boolean constant.
 * @property {string} ERROR - Error constant.
 * @property {string} ID - Function name or Cell reference.
 * @property {string} SHEET - Sheet.
 * @property {string} RANGE - Range.
 * @property {string} PLUS - The plus sign (+).
 * @property {string} MINUS - The minus sign (-).
 * @property {string} MULT - The multiplication sign (*).
 * @property {string} DIV - The division sign (/).
 * @property {string} POW - The exponent sign (^).
 * @property {string} LT - The less than sign (<).
 * @property {string} GT - The greater than sign (>).
 * @property {string} EQ - The equal sign (=).
 * @property {string} LE - The less than or equal sign (<=).
 * @property {string} GE - The greater than or equal sign (>=).
 * @property {string} NE - The not equal sign (<>).
 * @property {string} CONCAT - The string concatenation sign (&).
 * @property {string} EXCLAMATION - The exclamation sign (!).
 * @property {string} PERCENT - The percent sign (%).
 * @property {string} COLON - The colon sign (:).
 * @property {string} COMMA - The comma sign (,).
 * @property {string} SEMICOLON - The semi-colon sign (;).
 * @property {string} PERIOD - The dot sign (.).
 * @property {string} DOLLAR - The dollar sign ($).
 * @property {string} LPAREN - The left parentheses sign (().
 * @property {string} RPAREN - The right parentheses sign ()).
 * @property {string} LBRACE - The left brace sign ({).
 * @property {string} RBRACE - The right brace sign (}).
 * @property {string} LBRACKET - The left bracket sign ([).
 * @property {string} RBRACKET - The right bracket sign (]).
 */
var TOKENS = exports.TOKENS = {
    EOL: '(eol)',

    // Constants
    NUMBER: '(number)',
    STRING: '(string)',
    BOOLEAN: '(boolean)',
    ERROR: '(error)',
    ID: '(identifier)',
    SHEET: '(sheet)',
    RANGE: '(range)',

    // Operators
    PLUS: '+',
    MINUS: '-',
    MULT: '*',
    DIV: '/',
    POW: '^',
    LT: '<',
    GT: '>',
    EQ: '=',
    LE: '<=',
    GE: '>=',
    NE: '<>',
    CONCAT: '&',
    EXCLAMATION: '!',
    PERCENT: '%',
    COLON: ':',
    COMMA: ',',
    SEMICOLON: ';',
    PERIOD: '.',
    DOLLAR: '$',
    LPAREN: '(',
    RPAREN: ')',
    LBRACE: '{',
    RBRACE: '}',
    LBRACKET: '[',
    RBRACKET: ']'
};

/**
 * Spreadsheet Error list
 * @see {@link http://docs.oasis-open.org/office/v1.2/os/OpenDocument-v1.2-os-part2.html#__RefHeading__1017966_715980110|5.12Constant Errors}
 *
 * @static
 * @constant
 * @type {object}
 * @property {string} #DIV/0! - Attempt to divide by zero, including division by an empty cell. ERROR.TYPE of 2.
 * @property {string} #NAME? - Unrecognized/deleted name. ERROR.TYPE of 5.
 * @property {string} #N/A - Not available. ISNA() applied to this value will return True. Lookup functions which failed, and NA(), return this value. ERROR.TYPE of 7.
 * @property {string} #NULL! - Intersection of ranges produced zero cells. ERROR.TYPE of 1.
 * @property {string} #NUM! - Failed to meet domain constraints (e.g., input was too large or too small). ERROR.TYPE of 6.
 * @property {string} #REF! - Reference to invalid cell (e.g., beyond the application's abilities). ERROR.TYPE of 4.
 * @property {string} #VALUE! - Parameter is wrong type. ERROR.TYPE of 3.
 */
var ERRORS = exports.ERRORS = {
    DIV: '#DIV/0!',
    NAME: '#NAME?',
    NA: '#N/A',
    NULL: '#NULL!',
    NUM: '#NUM!',
    REF: '#REF!',
    VALUE: '#VALUE!'
};

/**
 * Basic operators
 *
 * @static
 * @constant
 * @type {object}
 * @property {string} + - The plus type, PLUS.
 * @property {string} - - The minus type, MINUS.
 * @property {string} * - The multiplication type, MULT.
 * @property {string} / - The division type, DIV.
 * @property {string} ^ - The exponent type, POW.
 * @property {string} < - The less than type, LT.
 * @property {string} > - The greater than type, GT.
 * @property {string} = - The equal type, EQ.
 * @property {string} <= - The less than or equal type, LE.
 * @property {string} >= - The greater than or equal type, GE.
 * @property {string} <> - The not equal type, NE.
 * @property {string} & - The string concatenation type, CONCAT.
 * @property {string} ! - The exclamation type, EXCLAMATION.
 * @property {string} % - The percent type, PERCENT.
 * @property {string} : - The colon type, COLON.
 * @property {string} , - The comma type, COMMA.
 * @property {string} ; - The semi-colon type, SEMICOLON.
 * @property {string} ( - The left parentheses type, LPAREN.
 * @property {string} ) - The right parentheses type, RPAREN.
 */
var OPERATORS = exports.OPERATORS = {
    '+': TOKENS.PLUS,
    '-': TOKENS.MINUS,
    '*': TOKENS.MULT,
    '/': TOKENS.DIV,
    '^': TOKENS.POW,
    '<': TOKENS.LT,
    '>': TOKENS.GT,
    '=': TOKENS.EQ,
    '<=': TOKENS.LE,
    '>=': TOKENS.GE,
    '<>': TOKENS.NE,
    '&': TOKENS.CONCAT,
    '!': TOKENS.EXCLAMATION,
    '%': TOKENS.PERCENT,
    ':': TOKENS.COLON,
    ',': TOKENS.COMMA,
    ';': TOKENS.SEMICOLON,
    '.': TOKENS.PERIOD,
    '(': TOKENS.LPAREN,
    ')': TOKENS.RPAREN,
    '{': TOKENS.LBRACE,
    '}': TOKENS.RBRACE,
    '[': TOKENS.LBRACKET,
    ']': TOKENS.RBRACKET
};

/**
 * Operation functions.
 *
 * @static
 * @constant
 * @type {object}
 */
var OP_FUNCTIONS = exports.OP_FUNCTIONS = {
    // Basic operations
    '+': function _(left, right) {
        return left + right;
    },
    '-': function _(left, right) {
        return left - right;
    },
    '*': function _(left, right) {
        return left * right;
    },
    '/': function _(left, right) {
        return left / right;
    },
    '^': function _(left, right) {
        return _functions.FUNCTIONS.POW(left, right);
    },

    // Relational operations
    '<': function _(left, right) {
        return left < right;
    },
    '>': function _(left, right) {
        return left > right;
    },
    '=': function _(left, right) {
        return left == right;
    }, // eslint-disable-line eqeqeq
    '<=': function _(left, right) {
        return left <= right;
    },
    '>=': function _(left, right) {
        return left >= right;
    },
    '<>': function _(left, right) {
        return left != right;
    }, // eslint-disable-line eqeqeq

    // Other operations
    '&': function _(left, right) {
        return _functions.FUNCTIONS.CONCAT(left, right);
    }
};

exports.FUNCTIONS = _functions.FUNCTIONS;