'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.TEXT_FUNCTIONS = undefined;

var _formulajs = require('formulajs');

var formula = _interopRequireWildcard(_formulajs);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var TEXT_FUNCTIONS = {
    // ASC: formula.ASC,
    // BAHTTEXT: formula.BAHTTEXT,
    // CHAR: formula.CHAR,
    // CLEAN: formula.CLEAN,
    // CODE: formula.CODE,
    CONCAT: function CONCAT(left, right) {
        return formula.CONCATENATE(left, right);
    },
    CONCATENATE: formula.CONCATENATE,
    // DBCS: formula.DBCS,
    // DOLLAR: formula.DOLLAR,
    // EXACT: formula.EXACT,
    // FIND: formula.FIND,
    // FIXED: formula.FIXED,
    // HTML2TEXT: formula.HTML2TEXT,
    LEFT: formula.LEFT,
    LEN: formula.LEN,
    LOWER: formula.LOWER,
    MID: formula.MID,
    // NUMBERVALUE: formula.NUMBERVALUE,
    // PRONETIC: formula.PRONETIC,
    PROPER: formula.PROPER,
    // REGEXEXTRACT: formula.REGEXEXTRACT,
    // REGEXMATCH: formula.REGEXMATCH,
    // REGEXREPLACE: formula.REGEXREPLACE,
    // REPLACE: formula.REPLACE,
    REPT: formula.REPT,
    RIGHT: formula.RIGHT,
    // SEARCH: formula.SEARCH,
    // SPLIT: formula.SPLIT,
    // SUBSTITUTE: formula.SUBSTITUTE,
    // T: formula.T,
    TEXT: formula.TEXT,
    TRIM: formula.TRIM,
    // UNICHAR: formula.UNICHAR,
    // UNICODE: formula.UNICODE,
    UPPER: formula.UPPER
    // VALUE: formula.VALUE,
};

exports.TEXT_FUNCTIONS = TEXT_FUNCTIONS;