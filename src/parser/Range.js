/**
 * Range object.
 */
export default class Range
{
    /**
    * Creates a Range.
    * @param {Position} first - First position.
    * @param {Position} last - Last position.
    */
    constructor(first, last)
    {
        this.first = first;
        this.last = last;
    }

    /**
     * Returns correct range, even if last column or row is smaller than first.
     * @return {Range} Correct range.
     */
    correct()
    {
        const first = this.first;
        const last = this.last;

        if (first.column > last.column)
        {
            const oldCol = first.column;

            first.column = last.column;
            last.column = oldCol;
        }

        if (first.row > last.row)
        {
            const oldRow = first.row;

            first.row = last.row;
            last.row = oldRow;
        }

        return new Range(first, last);
    }
}
