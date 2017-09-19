import AST from './AST';
import Position from './../Position';

/**
 * Cell identifier.
 *
 * @extends AST
 */
export default class CellIdentifier extends AST
{
    /**
     * Create a Cell identifier object.
     * @param {string} [name] - Function name.
     * @param {string} [sheet] - Sheet name.
     */
    constructor(name, sheet = null)
    {
        super();

        this.name = name;
        this.sheet = sheet;
    }

    /**
     * Get cell name (without dollar sign).
     * @return {string} Cell name.
     */
    clean()
    {
        return this.name.toUpperCase().replace(/\$/g, '');
    }

    /**
     * Get cell column and row numbers.
     * @return {Position} Cell position.
     */
    position()
    {
        const ref = this.clean();
        const columnString = ref.replace(/[^a-z]/gi, '');
        const column = CellIdentifier.toDecimal(columnString);
        const rowString = ref.replace(/[^0-9]/g, '');
        const row = parseInt(rowString, 10);

        return new Position(column, row);
    }

    /**
     * From Column string to number. Example: AA => 27
     * Based on: https://stackoverflow.com/questions/12699030/implement-numbering-scheme-like-a-b-c-aa-ab-aaa-similar-to-converting-a-num
     * @param {*} str - Column string
     * @return {number} Column number
     */
    static toDecimal(str)
    {
        let decimal = 0;
        const letters = str.toUpperCase().split(new RegExp());

        for (let i = letters.length - 1; i >= 0; i--)
        {
            decimal += (letters[i].charCodeAt(0) - 64) * (Math.pow(26, letters.length - (i + 1)));
        }

        return decimal;
    }
}
