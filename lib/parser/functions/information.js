'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.INFORMATION_FUNCTIONS = undefined;

var _formulajs = require('formulajs');

var formula = _interopRequireWildcard(_formulajs);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var INFORMATION_FUNCTIONS = {
    // INFO: formula.INFO,
    // ISBLANK: formula.ISBLANK,
    ISBINARY: formula.ISBINARY,
    // ISERR: formula.ISERR, // How to handle error?
    ISERR: formula.ISERR,
    ISERROR: formula.ISERROR, // @todo test this
    ISEVEN: formula.ISEVEN,
    // ISFORMULA: formula.ISFORMULA, // How to handle formula?
    ISLOGICAL: formula.ISLOGICAL,
    // ISNA: formula.ISNA, // How to handle error?
    ISNONTEXT: formula.ISNONTEXT,
    ISNUMBER: formula.ISNUMBER,
    ISODD: formula.ISODD,
    // ISREF: formula.ISREF, // How to handle reference?
    ISTEXT: formula.ISTEXT,
    N: function N(value) {
        return formula.N.apply(INFORMATION_FUNCTIONS, [value]);
    },
    // NA: formula.NA, // How to handle error?
    // SHEET: formula.SHEET,
    // SHEETS: formula.SHEETS,
    TYPE: function TYPE(value) {
        return formula.TYPE.apply(INFORMATION_FUNCTIONS, [value]);
    }
};

exports.INFORMATION_FUNCTIONS = INFORMATION_FUNCTIONS;