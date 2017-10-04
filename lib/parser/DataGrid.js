'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _object = require('object.values');

var _object2 = _interopRequireDefault(_object);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

if (!Object.values) {
    _object2.default.shim();
}

/**
 * Data from a Worksheet.
 */

var DataGrid = function () {
    /**
    * Creates a Data map.
    * @param {object} [values] - List of values.
    */
    function DataGrid() {
        var values = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        _classCallCheck(this, DataGrid);

        this.values = values;
    }

    /**
     * Get a Cell value;
     * @param {CellIdentifier} [cell] - The Cell.
     * @return {*}                      Cell value.
     */


    _createClass(DataGrid, [{
        key: 'getValue',
        value: function getValue(cell) {
            var name = cell.clean();

            return this.values[name];
        }

        /**
         * Get a Range array.
         * @todo implement this.
         * @param {RangeReference} [range] - Range.
         * @return {array}                   Range values.
         */

    }, {
        key: 'getRange',
        value: function getRange(range) {
            var _range$pair = range.pair(),
                _range$pair2 = _slicedToArray(_range$pair, 2),
                first = _range$pair2[0],
                last = _range$pair2[1]; // eslint-disable-line no-unused-vars


            var result = Object.values(this.values);

            return result;
        }
    }]);

    return DataGrid;
}();

DataGrid.displayName = 'DataGrid';
exports.default = DataGrid;