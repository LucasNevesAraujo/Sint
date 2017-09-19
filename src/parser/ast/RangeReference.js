import AST from './AST';
import CellIdentifier from './CellIdentifier';
import Range from './../Range';

/**
 * Range reference.
 *
 * @extends AST
 */
export default class RangeReference extends AST
{
    /**
     * Create a Cell identifier object.
     * @param {Token} [token] - Range token.
     * @param {string} [sheet] - Sheet name.
     */
    constructor(token, sheet = null)
    {
        super();

        this.token = token;
        this.rangeValue = token.value;
        this.sheet = sheet;
    }

    /**
     * Get Range pair
     * @return {array} Two CellIdentifier
     */
    pair()
    {
        const pairs = this.rangeValue.split(':');

        return [
            new CellIdentifier(pairs[0]),
            new CellIdentifier(pairs[1]),
        ];
    }

    /**
     * Get range information
     * @return {Range} Range object
     */
    range()
    {
        const pairs = this.pair();

        return new Range(pairs[0].position(), pairs[1].position());
    }
}
