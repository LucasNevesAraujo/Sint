import * as formula from 'formulajs';

const INFORMATION_FUNCTIONS = {
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
    N: (value) => formula.N.apply(INFORMATION_FUNCTIONS, [value]),
    // NA: formula.NA, // How to handle error?
    // SHEET: formula.SHEET,
    // SHEETS: formula.SHEETS,
    TYPE: (value) => formula.TYPE.apply(INFORMATION_FUNCTIONS, [value]),
};

export {
    INFORMATION_FUNCTIONS,
};
