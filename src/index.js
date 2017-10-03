import 'babel-polyfill';
import * as consts from './Constants';
import { version as VERSION } from './../package.json';

export * from './parser';

export {
    consts,
    VERSION,
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
