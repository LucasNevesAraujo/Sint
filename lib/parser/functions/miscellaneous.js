'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.MISCELLANEOUS_FUNCTIONS = undefined;

var _formulajs = require('formulajs');

var formula = _interopRequireWildcard(_formulajs);

var _utils = require('formulajs/lib/utils');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var MISCELLANEOUS_FUNCTIONS = {
    UNIQUE: function UNIQUE() {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return formula.UNIQUE.apply(null, (0, _utils.flatten)(args));
    }
    // FLATTEN: formula.FLATTEN,
    // ARGS2ARRAY: formula.ARGS2ARRAY,
    // REFERENCE: formula.REFERENCE,
    // JOIN: formula.JOIN,
    // NUMBERS: formula.NUMBERS,
    // NUMERAL: formula.NUMERAL,
};

exports.MISCELLANEOUS_FUNCTIONS = MISCELLANEOUS_FUNCTIONS;