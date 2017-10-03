import AST from './AST';

/**
 * StringConstant represents Strings.
 *
 * @extends AST
 */
export default class StringConstant extends AST
{
    /**
     * Create a String constant.
     * @param {string} value - String.
     */
    constructor(value)
    {
        super();

        this.value = value;
    }
}
