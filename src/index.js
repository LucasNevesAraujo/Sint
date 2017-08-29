import 'babel-polyfill';
import * as consts from './Constants';

export * from './parser';

export {
    consts,
};

const Sint = exports; // eslint-disable-line

global.Sint = Sint; // eslint-disable-line

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') // eslint-disable-line
{
    module.exports = Sint; // eslint-disable-line
}
else if (typeof define === 'function' && define.amd) // eslint-disable-line
{
    define([], function () // eslint-disable-line
    {
        return Sint;
    });
}
else
{
    window.Sint = Sint; // eslint-disable-line
}
