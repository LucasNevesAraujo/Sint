import AST from './AST';

/**
 * ErrorConstant represents Error references.
 *
 * @extends AST
 */
export default class ErrorConstant extends AST
{
    /**
     * Create a Error constant.
     * @param {string} [value] - Error description.
     */
    constructor(value)
    {
        super();

        this.value = value;
    }
}
