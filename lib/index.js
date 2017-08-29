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


global.Sint = exports; // eslint-disable-line