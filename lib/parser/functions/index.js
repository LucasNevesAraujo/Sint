'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.FUNCTIONS = undefined;

var _dateTime = require('./date-time');

var _information = require('./information');

var _logical = require('./logical');

var _mathTrig = require('./math-trig');

var _miscellaneous = require('./miscellaneous');

var _statistical = require('./statistical');

var _text = require('./text');

/**
 * Default functions
 *
 * @static
 * @constant
 * @type {object}
 */

// import { LOOKUP_REFERENCE_FUNCTIONS } from './lookup-reference';

// import { ENGINEERING_FUNCTIONS } from './engineering';
// import { FINANCIAL_FUNCTIONS } from './financial';
var FUNCTIONS = Object.assign(_dateTime.DATE_TIME_FUNCTIONS,
// DATABASE_FUNCTIONS,
// ENGINEERING_FUNCTIONS,
// FINANCIAL_FUNCTIONS,
_information.INFORMATION_FUNCTIONS, _logical.LOGICAL_FUNCTIONS,
// LOOKUP_REFERENCE_FUNCTIONS,
_mathTrig.MATH_TRIG_FUNCTIONS, _miscellaneous.MISCELLANEOUS_FUNCTIONS, _statistical.STATISTICAL_FUNCTIONS, _text.TEXT_FUNCTIONS); // import { DATABASE_FUNCTIONS } from './database';
exports.FUNCTIONS = FUNCTIONS;