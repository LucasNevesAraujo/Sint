/**
 * Position object.
 */
export default class Position
{
    /**
     * Cell Position
     * @param {number} column - Cell column.
     * @param {number} row - Cell row.
     */
    constructor(column = 0, row = 0)
    {
        this.column = column;
        this.row = row;
    }
}
