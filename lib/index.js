'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.consts = undefined;

var _parser = require('./parser');

Object.keys(_parser).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
        enumerable: true,
        get: function get() {
            return _parser[key];
        }
    });
});

require('babel-polyfill');

var _Constants = require('./Constants');

var consts = _interopRequireWildcard(_Constants);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.consts = consts;


var Sint = exports; // eslint-disable-line

global.Sint = Sint; // eslint-disable-line

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') // eslint-disable-line
    {
        module.exports = Sint; // eslint-disable-line
    } else if (typeof define === 'function' && define.amd) // eslint-disable-line
    {
        define([], function () // eslint-disable-line
        {
            return Sint;
        });
    } else {
    window.Sint = Sint; // eslint-disable-line
}