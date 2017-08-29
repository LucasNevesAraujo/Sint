'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.LOGICAL_FUNCTIONS = undefined;

var _formulajs = require('formulajs');

var formula = _interopRequireWildcard(_formulajs);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var LOGICAL_FUNCTIONS = {
    AND: formula.AND,
    // CHOOSE: formula.CHOOSE,
    FALSE: formula.FALSE,
    IF: formula.IF,
    // IFERROR: formula.IFERROR,
    // IFNA: formula.IFNA,
    NOT: formula.NOT,
    OR: formula.OR,
    TRUE: formula.TRUE
    // XOR: formula.XOR,
    // SWITCH: formula.SWITCH,
};

exports.LOGICAL_FUNCTIONS = LOGICAL_FUNCTIONS;