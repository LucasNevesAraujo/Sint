// import { DATABASE_FUNCTIONS } from './database';
import { DATE_TIME_FUNCTIONS } from './date-time';
// import { ENGINEERING_FUNCTIONS } from './engineering';
// import { FINANCIAL_FUNCTIONS } from './financial';
import { INFORMATION_FUNCTIONS } from './information';
import { LOGICAL_FUNCTIONS } from './logical';
// import { LOOKUP_REFERENCE_FUNCTIONS } from './lookup-reference';
import { MATH_TRIG_FUNCTIONS } from './math-trig';
import { MISCELLANEOUS_FUNCTIONS } from './miscellaneous';
import { STATISTICAL_FUNCTIONS } from './statistical';
import { TEXT_FUNCTIONS } from './text';

/**
 * Default functions
 *
 * @static
 * @constant
 * @type {object}
 */
const FUNCTIONS = Object.assign(
    DATE_TIME_FUNCTIONS,
    // DATABASE_FUNCTIONS,
    // ENGINEERING_FUNCTIONS,
    // FINANCIAL_FUNCTIONS,
    INFORMATION_FUNCTIONS,
    LOGICAL_FUNCTIONS,
    // LOOKUP_REFERENCE_FUNCTIONS,
    MATH_TRIG_FUNCTIONS,
    MISCELLANEOUS_FUNCTIONS,
    STATISTICAL_FUNCTIONS,
    TEXT_FUNCTIONS
);

export {
    FUNCTIONS,
};
