'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.DATE_TIME_FUNCTIONS = undefined;

var _formulajs = require('formulajs');

var formula = _interopRequireWildcard(_formulajs);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var DATE_TIME_FUNCTIONS = {
    DATE: formula.DATE,
    // DATEVALUE: formula.DATEVALUE, // Not working
    DAY: formula.DAY,
    // DAYS: formula.DAYS,
    // DAYS360: formula.DAYS360,
    // EDATE: formula.EDATE,
    // EOMONTH: formula.EOMONTH,
    // HOUR: formula.HOUR, // Not working
    // INTERVAL: formula.INTERVAL,
    // ISOWEEKNUM: formula.ISOWEEKNUM,
    // MINUTE: formula.MINUTE, // Not working
    MONTH: formula.MONTH,
    // NETWORKDAYS: formula.NETWORKDAYS,
    NOW: formula.NOW,
    // SECOND: formula.SECOND, // Not working
    TIME: formula.TIME,
    // TIMEVALUE: formula.TIMEVALUE,
    TODAY: formula.TODAY,
    // WEEKDAY: formula.WEEKDAY,
    // WEEKNUM: formula.WEEKNUM,
    // WORKDAY: formula.WORKDAY,
    YEAR: formula.YEAR
    // YEARFRAC: formula.YEARFRAC,
};

exports.DATE_TIME_FUNCTIONS = DATE_TIME_FUNCTIONS;