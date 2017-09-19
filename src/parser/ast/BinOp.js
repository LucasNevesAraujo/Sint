import AST from './AST';

/**
 * Binary Operator. A binary operator is an operator that operates on two operands.
 *
 * @extends AST
 */
export default class BinOp extends AST
{
    /**
     * Create a Binary Operator.
     * @param {string} left - Left operand.
     * @param {Token} op - Operator.
     * @param {string} right - Right operand.
     */
    constructor(left, op, right)
    {
        super();

        this.left = left;
        this.token = this.op = op;
        this.right = right;
    }
}
