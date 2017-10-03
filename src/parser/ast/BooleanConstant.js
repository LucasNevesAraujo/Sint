import AST from './AST';

/**
 * BooleanConstant represents Booleans.
 *
 * @extends AST
 */
export default class BooleanConstant extends AST
{
    /**
     * Create a Boolean constant.
     * @param {boolean} value - Boolean.
     */
    constructor(value)
    {
        super();

        this.value = value;
    }
}
