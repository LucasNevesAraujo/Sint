"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Range object.
 */
var Range = function () {
    /**
    * Creates a Range.
    * @param {Position} first - First position.
    * @param {Position} last - Last position.
    */
    function Range(first, last) {
        _classCallCheck(this, Range);

        this.first = first;
        this.last = last;
    }

    /**
     * Returns correct range, even if last column or row is smaller than first.
     * @return {Range} Correct range.
     */


    _createClass(Range, [{
        key: "correct",
        value: function correct() {
            var first = this.first;
            var last = this.last;

            if (first.column > last.column) {
                var oldCol = first.column;

                first.column = last.column;
                last.column = oldCol;
            }

            if (first.row > last.row) {
                var oldRow = first.row;

                first.row = last.row;
                last.row = oldRow;
            }

            return new Range(first, last);
        }
    }]);

    return Range;
}();

Range.displayName = "Range";
exports.default = Range;