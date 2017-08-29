import values from 'object.values';

if (!Object.values)
{
    values.shim();
}

/**
 * Data from a Worksheet.
 */
export default class DataGrid
{
    /**
    * Creates a Data map.
    * @param {object} [values] - List of values.
    */
    constructor(values = {})
    {
        this.values = values;
    }

    /**
     * Get a Cell value;
     * @param {CellIdentifier} [cell] - The Cell.
     * @return {*}                      Cell value.
     */
    getValue(cell)
    {
        const name = cell.clean();

        return this.values[name];
    }

    /**
     * Get a Range array.
     * @todo implement this.
     * @param {RangeReference} [range] - Range.
     * @return {array}                   Range values.
     */
    getRange(range)
    {
        const [first, last] = range.pair(); // eslint-disable-line no-unused-vars
        const result = Object.values(this.values);

        return result;
    }
}
