import Lexer from './Lexer';
import Parser from './Parser';
import DataGrid from './DataGrid';
import { AST } from './AST';
import { TOKENS, OP_FUNCTIONS, FUNCTIONS } from './../Constants';
import NodeVisitor from './NodeVisitor';

/**
 * Execute an AST.
 * @todo Implement promises as return from function calls.
 * @todo Implement error handling.
 * @todo Implement worksheet data structure.
 */
export default class Interpreter extends NodeVisitor
{
    /**
     * Create a Interpreter
     * @param {DataGrid} [data] - Data object.
     * @param {object}   [list] - List of functions.
     */
    constructor(data = null, list = null)
    {
        super();
        this.data = (data ? data : new DataGrid());
        this.functions = (list ? list : FUNCTIONS);
    }

    /**
     * Visit a FunctionCall object.
     * @throws Will throw an error if function doesn't exists.
     * @param {AST} [node] - The tree or node.
     * @return {*} Result of operation.
     */
    visitFunctionCall(node)
    {
        const name = node.name;
        const fn = this.functionByName(name);

        if (fn && typeof fn === 'function')
        {
            const args = [];

            for (const index in node.params)
            {
                const arg = node.params[index];

                args.push(this.visit(arg));
            }

            return fn.apply(null, args);
        }

        throw new Error(`Function "${name}" doesn't exists.`);
    }

    /**
     * Visit a CellIdentifier object
     * @param {AST} [node] - The tree or node.
     * @return {*}           Cell value or null.
     */
    visitCellIdentifier(node)
    {
        if (this.data)
        {
            return this.data.getValue(node);
        }

        return null;
    }

    /**
     * Visit a RangeReference object
     * @param {AST} [node] - The tree or node.
     * @return {array}       Range as array.
     */
    visitRangeReference(node)
    {
        if (this.data)
        {
            return this.data.getRange(node);
        }

        return null;
    }

    /**
     * Visit a BinOp object
     * @param {AST} [node] - The tree or node.
     * @return {*} Result of operation.
     */
    visitBinOp(node)
    {
        const sign = node.op.value;
        const operator = OP_FUNCTIONS[sign];

        if (operator)
        {
            return operator(this.visit(node.left), this.visit(node.right));
        }

        return null;
    }

    /**
     * Visit a UnaryOp object
     * @param {AST} [node] - The tree or node.
     * @return {*} Result of operation.
     */
    visitUnaryOp(node)
    {
        if (node.op.type === TOKENS.MINUS)
        {
            return -(this.visit(node.expr));
        }

        return +(this.visit(node.expr)); // eslint-disable-line no-implicit-coercion
    }

    /**
     * Visit a PostfixOp object
     * @param {AST} [node] - The tree or node.
     * @return {*} Result of operation.
     */
    visitPostfixOp(node)
    {
        return Number(this.visit(node.expr) / 100);
    }

    /**
     * Visit a ArrayConstant object
     * @param {AST} [node] - The tree or node.
     * @return {number} Node value.
     */
    visitArrayConstant(node)
    {
        if (!Array.isArray(node.value))
        {
            return [];
        }

        const columns = node.value;
        const constant = [];
        let column = [];
        let row = [];

        for (const i in columns)
        {
            column = columns[i];
            constant[i] = [];
            for (const j in column)
            {
                row = column[j];
                constant[i][j] = this.visit(row);
            }
        }

        return constant;
    }

    /**
     * Visit a NumberConstant object
     * @param {AST} [node] - The tree or node.
     * @return {number} Node value.
     */
    visitNumberConstant(node)
    {
        return node.value;
    }

    /**
     * Visit a StringConstant object
     * @param {AST} [node] - The tree or node.
     * @return {string} Node value.
     */
    visitStringConstant(node)
    {
        return node.value;
    }

    /**
     * Visit a BooleanConstant object
     * @param {AST} [node] - The tree or node.
     * @return {boolean} Node value.
     */
    visitBooleanConstant(node)
    {
        return node.value;
    }

    /**
     * Visit a ErrorConstant object
     * @param {AST} [node] - The tree or node.
     * @return {null} Node value.
     */
    visitErrorConstant(node)
    {
        return node.value;
    }

    /**
     * Return a function from a list.
     * @param {string} [name] - Function name.
     * @return {Function} The function.
     */
    functionByName(name)
    {
        const fns = this.functions;

        return fns[name];
    }

    /**
     * Add more functions to the function list.
     * @param  {object} [list] - Pairs of name : function.
     * @return {object} Function list.
     */
    addFunctions(list)
    {
        this.functions = Object.assign(this.functions, list);

        return this.functions;
    }

    /**
     * Set functions.
     * @param  {object} [list] - Pairs of name : function.
     */
    set functions(list)
    {
        this._functions = list;
    }

    /**
     * Return functions.
     * @return {object} Function list.
     */
    get functions()
    {
        return this._functions;
    }

    /**
     * Execute a AST or parse and then execute a code.
     * @throws Will throw an error if is a invalid code.
     * @param {string|AST} [source] - Source code or AST.
     * @return {*}                    The result of the code.
     */
    execute(source)
    {
        if (typeof source === 'string')
        {
            const lexer = new Lexer(source);
            const parser = new Parser(lexer);
            const tree = parser.parse();

            return this.execute(tree);
        }
        else if (source instanceof AST)
        {
            return this.visit(source);
        }

        return null;
    }

    /**
     * Execute a AST or parse and then execute a code.
     * @throws Will throw an error if is a invalid code.
     * @param {string|AST} [source] - Source code or AST.
     * @param {DataGrid}   [data]   - Data object.
     * @return {*}                    The result of the code.
     */
    run(source = null, data = null)
    {
        if (data !== null)
        {
            this.data = data;
        }

        return this.execute(source);
    }
}
