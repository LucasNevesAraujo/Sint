import AST from './AST';

/**
 * NumberConstant represents Numbers.
 *
 * @extends AST
 */
export default class NumberConstant extends AST
{
    /**
     * Create a Number constant.
     * @param {number} value - Integer or float value.
     */
    constructor(value)
    {
        super();

        this.value = value;
    }
}
