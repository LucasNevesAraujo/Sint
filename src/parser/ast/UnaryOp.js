import AST from './AST';

/**
 * An AST node class to represent unary operators
 *
 * @extends AST
 */
export default class UnaryOp extends AST
{
    /**
     * Create a Unary Operator.
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
