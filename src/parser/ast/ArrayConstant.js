import AST from './AST';

/**
 * ArrayConstant represents an array.
 *
 * @extends AST
 */
export default class ArrayConstant extends AST
{
    /**
     * Create a Array constant.
     * @param {array} value - List of items.
     */
    constructor(value)
    {
        super();

        this.value = value;
    }
}
