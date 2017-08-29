import * as formula from 'formulajs';

const DATE_TIME_FUNCTIONS = {
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
    YEAR: formula.YEAR,
    // YEARFRAC: formula.YEARFRAC,
};

export {
    DATE_TIME_FUNCTIONS,
};
