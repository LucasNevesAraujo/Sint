/**
 * Range object.
 */
export default class Range
{
    /**
    * Creates a Token.
    * @param {Position} first - First position.
    * @param {Position} last - Last position.
    */
    constructor(first, last = null)
    {
        this.first = first;
        this.last = last;
    }
}
