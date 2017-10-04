"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Position object.
 */
var Position =
/**
 * Cell Position
 * @param {number} column - Cell column.
 * @param {number} row - Cell row.
 */
function Position() {
  var column = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var row = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

  _classCallCheck(this, Position);

  this.column = column;
  this.row = row;
};

Position.displayName = "Position";
exports.default = Position;