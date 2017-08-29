import * as formula from 'formulajs';
import { flatten } from 'formulajs/lib/utils';

const MISCELLANEOUS_FUNCTIONS = {
    UNIQUE: (...args) => formula.UNIQUE.apply(null, flatten(args)),
    // FLATTEN: formula.FLATTEN,
    // ARGS2ARRAY: formula.ARGS2ARRAY,
    // REFERENCE: formula.REFERENCE,
    // JOIN: formula.JOIN,
    // NUMBERS: formula.NUMBERS,
    // NUMERAL: formula.NUMERAL,
};

export {
    MISCELLANEOUS_FUNCTIONS,
};
