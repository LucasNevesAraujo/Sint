/**
 * Abstract Syntax Tree node
 */
export class AST
{
}

/**
 * Function call.
 *
 * @extends AST
 */
export class FunctionCall extends AST
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

/**
 * Cell identifier.
 *
 * @extends AST
 */
export class CellIdentifier extends AST
{
    /**
     * Create a Cell identifier object.
     * @param {string} [name] - Function name.
     * @param {string} [sheet] - Sheet name.
     */
    constructor(name, sheet = null)
    {
        super();

        this.name = name;
        this.sheet = sheet;
    }

    /**
     * Get cell name (without dollar sign).
     * @return {string} Cell name.
     */
    clean()
    {
        return this.name.replace(/\$/g, '');
    }
}

/**
 * Range reference.
 *
 * @extends AST
 */
export class RangeReference extends AST
{
    /**
     * Create a Cell identifier object.
     * @param {Token} [token] - Range token.
     * @param {string} [sheet] - Sheet name.
     */
    constructor(token, sheet = null)
    {
        super();

        this.token = token;
        this.range = token.value;
        this.sheet = sheet;
    }

    /**
     * Get Range pair
     * @return {array} Two CellIdentifier
     */
    pair()
    {
        const pairs = this.range.split(':');

        return [
            new CellIdentifier(pairs[0]),
            new CellIdentifier(pairs[1]),
        ];
    }
}

/**
 * Binary Operator. A binary operator is an operator that operates on two operands.
 *
 * @extends AST
 */
export class BinOp extends AST
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

/**
 * An AST node class to represent unary operators
 *
 * @extends AST
 */
export class UnaryOp extends AST
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

/**
 * An AST node class to represent postfix operators
 *
 * @extends AST
 */
export class PostfixOp extends AST
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

/**
 * ArrayConstant represents an array.
 *
 * @extends AST
 */
export class ArrayConstant extends AST
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

/**
 * NumberConstant represents Numbers.
 *
 * @extends AST
 */
export class NumberConstant extends AST
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

/**
 * StringConstant represents Strings.
 *
 * @extends AST
 */
export class StringConstant extends AST
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

/**
 * BooleanConstant represents Booleans.
 *
 * @extends AST
 */
export class BooleanConstant extends AST
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

/**
 * ErrorConstant represents Error references.
 *
 * @extends AST
 */
export class ErrorConstant extends AST
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
