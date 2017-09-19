import AST from './AST';

/**
 * Function call.
 *
 * @extends AST
 */
export default class FunctionCall extends AST
{
    /**
     * Create a Function call object.
     * @param {string} [name] - Function name.
     * @param {array} [params] - Function parameters.
     */
    constructor(name, params)
    {
        super();

        this.name = name;
        this.params = params;
    }
}
