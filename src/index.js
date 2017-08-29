import 'babel-polyfill';
import * as consts from './Constants';

export * from './parser';

export {
    consts,
};

global.Sint = exports; // eslint-disable-line
