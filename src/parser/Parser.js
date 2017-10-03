import { TOKENS } from './../Constants';
import {
    FunctionCall,
    CellIdentifier,
    RangeReference,
    BinOp,
    UnaryOp,
    PostfixOp,
    ArrayConstant,
    NumberConstant,
    StringConstant,
    BooleanConstant,
    ErrorConstant,
} from './ast';

/**
 * Syntax analyzer
 *
 * @example <caption>Grammar:</caption>
 *
 * start : constant
 *       | '=' expr
 *       ;
 *
 * expr : relExp ((EQ | NE) relExp)* ;
 *
 * relExp : addExp ((LT | LE | GT | GE) addExp)* ;
 *
 * addExp : mulExp ((PLUS | MINUS | CONCAT) mulExp)* ;
 *
 * mulExp : expExp ((MULT | DIV) expExp)* ;
 *
 * expExp : term ((EXP) term)* ;
 *
 * term : (PLUS | MINUS) factor (PERCENT)? ;
 *
 * factor : constant
 *        | formula
 *        | '{' arraycolumns '}'
 *        | '(' expr ')'
 *        ;
 *
 * arraycolumns : arrayrows
 *              | arrayrows ';' arraycolumns
 *              ;
 *
 * arrayrows : expr
 *           | expr ',' arrayrows
 *           ;
 *
 * formula : (SHEET)? reference ;
 *
 * reference : ID ('(' parameters ')')?
 *           | RANGE
 *           ;
 *
 * parameters : expr (',' expr)
 *            | empty
 *            ;
 *
 * constant : NUMBER
 *          | STRING
 *          | BOOL
 *          | ERROR
 *          ;
 */
export default class Parser
{
    /**
     * Creates a Parser.
     * @param {Lexer} lexer - Lexical analyzer object.
     */
    constructor(lexer = null)
    {
        this.lexer = lexer;
    }

    /**
     * Start rule.
     *
     * @example <caption>Grammar:</caption>
     *
     *  start : constant
     *        | '=' expr
     *        ;
     *
     * @return {AST} Abstract Syntax tree.
     */
    start()
    {
        if (this.lookahead.type === TOKENS.EQ)
        {
            this.match(TOKENS.EQ);

            return this.expr();
        }

        return this.constant();
    }

    /**
     * Expression rule.
     *
     * @example <caption>Grammar:</caption>
     *
     * expr : relExp ((EQ | NE) relExp)* ;
     *
     * @return {AST} Abstract Syntax tree.
     */
    expr()
    {
        let node = this.relExp();

        while ([TOKENS.EQ, TOKENS.NE].includes(this.lookahead.type))
        {
            const token = this.lookahead;

            this.match(token.type);
            node = new BinOp(node, token, this.relExp());
        }

        return node;
    }

    /**
     * Relational operators rule.
     *
     * @example <caption>Grammar:</caption>
     *
     * relExp : addExp ((LT | LE | GT | GE) addExp)* ;
     *
     * @return {AST} Abstract Syntax tree.
     */
    relExp()
    {
        let node = this.addExp();

        while ([TOKENS.LT, TOKENS.LE, TOKENS.GT, TOKENS.GE].includes(this.lookahead.type))
        {
            const token = this.lookahead;

            this.match(token.type);
            node = new BinOp(node, token, this.addExp());
        }

        return node;
    }

    /**
     * Addition and subtraction Expression rule.
     *
     * @example <caption>Grammar:</caption>
     *
     * addExp : mulExp ((PLUS | MINUS | CONCAT) mulExp)* ;
     *
     * @return {AST} Abstract Syntax tree.
     */
    addExp()
    {
        let node = this.mulExp();

        while ([TOKENS.PLUS, TOKENS.MINUS, TOKENS.CONCAT].includes(this.lookahead.type))
        {
            const token = this.lookahead;

            this.match(token.type);
            node = new BinOp(node, token, this.mulExp());
        }

        return node;
    }

    /**
     * Multiplication and division rule.
     *
     * @example <caption>Grammar:</caption>
     *
     * mulExp : expExp ((MULT | DIV) expExp)* ;
     *
     * @return {AST} Abstract Syntax tree.
     */
    mulExp()
    {
        let node = this.expExp();

        while ([TOKENS.MULT, TOKENS.DIV].includes(this.lookahead.type))
        {
            const token = this.lookahead;

            this.match(token.type);
            node = new BinOp(node, token, this.expExp());
        }

        return node;
    }

    /**
     * Exponentiation rule.
     *
     * @example <caption>Grammar:</caption>
     *
     * expExp : term ((EXP) term)* ;
     *
     * @return {AST} Abstract Syntax tree.
     */
    expExp()
    {
        let node = this.term();

        while ([TOKENS.POW].includes(this.lookahead.type))
        {
            const token = this.lookahead;

            this.match(token.type);
            node = new BinOp(node, token, this.term());
        }

        return node;
    }

    /**
     * Term rule.
     *
     * @example <caption>Grammar:</caption>
     *
     * term : (PLUS | MINUS) factor (PERCENT)? ;
     *
     * @return {AST} Abstract Syntax tree.
     */
    term()
    {
        let unary = null;
        let postfix = null;

        if ([TOKENS.PLUS, TOKENS.MINUS].includes(this.lookahead.type))
        {
            unary = this.lookahead;
            this.match(this.lookahead.type);
        }

        const node = this.factor();

        if (this.lookahead.type === TOKENS.PERCENT)
        {
            postfix = this.lookahead;
            this.match(TOKENS.PERCENT);
        }

        if (unary !== null)
        {
            if (postfix !== null)
            {
                return new PostfixOp(postfix, new UnaryOp(unary, node));
            }

            return new UnaryOp(unary, node);
        }
        else if (postfix !== null)
        {
            return new PostfixOp(postfix, node);
        }

        return node;
    }
    /**
     * Factor rule.
     *
     * @example <caption>Grammar:</caption>
     *
     * factor : constant
     *        | formula
     *        | '{' arraycolumns '}'
     *        | '(' expr ')'
     *        ;
     *
     * @return {AST} Abstract Syntax tree.
     */
    factor()
    {
        const constants = [TOKENS.NUMBER, TOKENS.STRING, TOKENS.BOOLEAN, TOKENS.ERROR];
        const token = this.lookahead;

        if (token.type === TOKENS.LPAREN)
        {
            this.match(TOKENS.LPAREN);

            const node = this.expr();

            this.match(TOKENS.RPAREN);

            return node;
        }
        if (token.type === TOKENS.LBRACE)
        {
            this.match(TOKENS.LBRACE);

            const items = this.arraycolumns();

            this.match(TOKENS.RBRACE);

            return new ArrayConstant(items);
        }
        else if (constants.includes(token.type))
        {
            return this.constant();
        }

        return this.formula();
    }

    /**
     * Array Columns rule.
     *
     * @example <caption>Grammar:</caption>
     *
     * arraycolumns : arrayrows
     *              | arrayrows ';' arraycolumns
     *              ;
     *
     * @return {AST} Abstract Syntax tree.
     */
    arraycolumns()
    {
        const columns = [this.arrayrows()];

        while (this.lookahead.type === TOKENS.SEMICOLON)
        {
            this.match(TOKENS.SEMICOLON);

            const column = this.arrayrows();

            columns.push(column);
        }

        return columns;
    }

    /**
     * Array Rows rule.
     *
     * @example <caption>Grammar:</caption>
     *
     * arrayrows : expr
     *           | expr ',' arrayrows
     *           ;
     *
     * @return {AST} Abstract Syntax tree.
     */
    arrayrows()
    {
        const rows = [this.expr()];

        while (this.lookahead.type === TOKENS.COMMA)
        {
            this.match(TOKENS.COMMA);

            const row = this.expr();

            rows.push(row);
        }

        return rows;
    }

    /**
     * Formula rule.
     *
     * @example <caption>Grammar:</caption>
     *
     * formula : (SHEET)? reference ;
     *
     * @return {AST} Abstract Syntax tree.
     */
    formula()
    {
        const token = this.lookahead;
        let name = null;

        if (token.type === TOKENS.SHEET)
        {
            this.match(TOKENS.SHEET);
            name = token.value;
        }

        return this.reference(name);
    }

    /**
     * Reference rule.
     *
     * @example <caption>Grammar:</caption>
     *
     * reference : ID ('(' parameters ')')?
     *           | RANGE
     *           ;
     *
     * @param {string} [sheet] - Sheet name
     * @return {AST} Abstract Syntax tree.
     */
    reference(sheet = null)
    {
        const token = this.lookahead;

        if (this.nextToken().type === TOKENS.LPAREN)
        {
            this.match(TOKENS.ID);
            this.match(TOKENS.LPAREN);

            const params = this.parameters();

            this.match(TOKENS.RPAREN);

            return new FunctionCall(token.value, params);
        }
        else if (token.type === TOKENS.RANGE)
        {
            this.match(TOKENS.RANGE);

            return new RangeReference(token, sheet);
        }

        this.match(TOKENS.ID);

        return new CellIdentifier(token.value, sheet);
    }

    /**
     * Parameters rule.
     *
     * @example <caption>Grammar:</caption>
     *
     * parameters : expr (',' expr)
     *            | empty
     *            ;
     *
     * @todo   Should accept empty parameters like "=COUNT(,,,,)".
     * @return {AST} Abstract Syntax tree.
     */
    parameters()
    {
        const params = [];

        while (this.lookahead.type !== TOKENS.RPAREN && this.lookahead.type !== TOKENS.EOL)
        {
            const param = this.expr();

            params.push(param);

            if (this.lookahead.type === TOKENS.COMMA)
            {
                this.match(TOKENS.COMMA);
            }
        }

        return params;
    }

    /**
     * Constant rule.
     *
     * @example <caption>Grammar:</caption>
     *
     * constant : NUMBER
     *          | STRING
     *          | BOOL
     *
     * @throws Will throw an error if it's not a constant.
     * @return {AST} Abstract Syntax tree.
     */
    constant()
    {
        const token = this.lookahead;
        let node;

        if (token.type === TOKENS.NUMBER)
        {
            this.match(TOKENS.NUMBER);
            node = new NumberConstant(token.value);
        }
        else if (token.type === TOKENS.STRING)
        {
            this.match(TOKENS.STRING);
            node = new StringConstant(token.value);
        }
        else if (token.type === TOKENS.BOOLEAN)
        {
            this.match(TOKENS.BOOLEAN);
            node = new BooleanConstant(token.value);
        }
        else if (token.type === TOKENS.ERROR)
        {
            this.match(TOKENS.ERROR);
            node = new ErrorConstant(token.value);
        }

        return node;
    }

    /**
     * Get the next token
     * @return {Token} Next token
     */
    nextToken()
    {
        return this.lexer.peek();
    }

    /**
     * Match the current token and move to the next.
     * @param {string} tokenType - Token type.
     * @throws Will throw an error if is a invalid token.
     */
    match(tokenType)
    {
        if (this.lookahead.type === tokenType)
        {
            this.lookahead = this.lexer.next();
        }
        else
        {
            throw new SyntaxError(`Invalid syntax. Expecting "${tokenType}"`);
        }
    }

    /**
     * Parse a list of tokens.
     * @throws Will throw an error if is a invalid token.
     * @return {AST} Abstract Syntax tree.
     */
    parse()
    {
        if (this.lookahead === null)
        {
            return null;
        }

        const node = this.start();

        if (this.lookahead.type !== TOKENS.EOL)
        {
            throw new SyntaxError(`Invalid syntax. Expecting end of line.`);
        }

        return node;
    }

    /**
     * Set a new Lexer.
     * @param {Lexer} value - Lexical analyzer object.
     */
    set lexer(value)
    {
        this._lexer = value;
        if (this._lexer)
        {
            this.lookahead = this._lexer.next();
        }
        else
        {
            this.lookahead = null;
        }
    }

    get lexer() // eslint-disable-line require-jsdoc
    {
        return this._lexer;
    }
}
