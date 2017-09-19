import AST from './AST';

/**
 * An AST node class to represent postfix operators
 *
 * @extends AST
 */
export default class PostfixOp extends AST
{
    /**
     * Create a Postfix Operator.
     * @param {Token} op - Operator.
     * @param {AST} expr - Expression.
     */
    constructor(op, expr)
    {
        super();

        this.token = this.op = op;
        this.expr = expr;
    }
}
