'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Constants = require('./../Constants');

var _ast = require('./ast');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
 * relExp : conExp ((LT | LE | GT | GE) conExp)* ;
 *
 * conExp : addExp ((CONCAT) addExp)* ;
 *
 * addExp : mulExp ((PLUS | MINUS) mulExp)* ;
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
var Parser = function () {
    /**
     * Creates a Parser.
     * @param {Lexer} lexer - Lexical analyzer object.
     */
    function Parser() {
        var lexer = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

        _classCallCheck(this, Parser);

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


    _createClass(Parser, [{
        key: 'start',
        value: function start() {
            if (this.lookahead.type === _Constants.TOKENS.EQ) {
                this.match(_Constants.TOKENS.EQ);

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

    }, {
        key: 'expr',
        value: function expr() {
            var node = this.relExp();

            while ([_Constants.TOKENS.EQ, _Constants.TOKENS.NE].includes(this.lookahead.type)) {
                var token = this.lookahead;

                this.match(token.type);
                node = new _ast.BinOp(node, token, this.relExp());
            }

            return node;
        }

        /**
         * Relational operators rule.
         *
         * @example <caption>Grammar:</caption>
         *
         * relExp : conExp ((LT | LE | GT | GE) conExp)* ;
         *
         * @return {AST} Abstract Syntax tree.
         */

    }, {
        key: 'relExp',
        value: function relExp() {
            var node = this.conExp();

            while ([_Constants.TOKENS.LT, _Constants.TOKENS.LE, _Constants.TOKENS.GT, _Constants.TOKENS.GE].includes(this.lookahead.type)) {
                var token = this.lookahead;

                this.match(token.type);
                node = new _ast.BinOp(node, token, this.conExp());
            }

            return node;
        }

        /**
         * Concatenation rule.
         *
         * @example <caption>Grammar:</caption>
         *
         * conExp : addExp ((CONCAT) addExp)* ;
         *
         * @return {AST} Abstract Syntax tree.
         */

    }, {
        key: 'conExp',
        value: function conExp() {
            var node = this.addExp();

            while ([_Constants.TOKENS.CONCAT].includes(this.lookahead.type)) {
                var token = this.lookahead;

                this.match(token.type);
                node = new _ast.BinOp(node, token, this.addExp());
            }

            return node;
        }

        /**
         * Addition and subtraction Expression rule.
         *
         * @example <caption>Grammar:</caption>
         *
         * addExp : mulExp ((PLUS | MINUS) mulExp)* ;
         *
         * @return {AST} Abstract Syntax tree.
         */

    }, {
        key: 'addExp',
        value: function addExp() {
            var node = this.mulExp();

            while ([_Constants.TOKENS.PLUS, _Constants.TOKENS.MINUS].includes(this.lookahead.type)) {
                var token = this.lookahead;

                this.match(token.type);
                node = new _ast.BinOp(node, token, this.mulExp());
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

    }, {
        key: 'mulExp',
        value: function mulExp() {
            var node = this.expExp();

            while ([_Constants.TOKENS.MULT, _Constants.TOKENS.DIV].includes(this.lookahead.type)) {
                var token = this.lookahead;

                this.match(token.type);
                node = new _ast.BinOp(node, token, this.expExp());
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

    }, {
        key: 'expExp',
        value: function expExp() {
            var node = this.term();

            while ([_Constants.TOKENS.POW].includes(this.lookahead.type)) {
                var token = this.lookahead;

                this.match(token.type);
                node = new _ast.BinOp(node, token, this.term());
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

    }, {
        key: 'term',
        value: function term() {
            var unary = null;
            var postfix = null;

            if ([_Constants.TOKENS.PLUS, _Constants.TOKENS.MINUS].includes(this.lookahead.type)) {
                unary = this.lookahead;
                this.match(this.lookahead.type);
            }

            var node = this.factor();

            if (this.lookahead.type === _Constants.TOKENS.PERCENT) {
                postfix = this.lookahead;
                this.match(_Constants.TOKENS.PERCENT);
            }

            if (unary !== null) {
                if (postfix !== null) {
                    return new _ast.PostfixOp(postfix, new _ast.UnaryOp(unary, node));
                }

                return new _ast.UnaryOp(unary, node);
            } else if (postfix !== null) {
                return new _ast.PostfixOp(postfix, node);
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

    }, {
        key: 'factor',
        value: function factor() {
            var constants = [_Constants.TOKENS.NUMBER, _Constants.TOKENS.STRING, _Constants.TOKENS.BOOLEAN, _Constants.TOKENS.ERROR];
            var token = this.lookahead;

            if (token.type === _Constants.TOKENS.LPAREN) {
                this.match(_Constants.TOKENS.LPAREN);

                var node = this.expr();

                this.match(_Constants.TOKENS.RPAREN);

                return node;
            }
            if (token.type === _Constants.TOKENS.LBRACE) {
                this.match(_Constants.TOKENS.LBRACE);

                var items = this.arraycolumns();

                this.match(_Constants.TOKENS.RBRACE);

                return new _ast.ArrayConstant(items);
            } else if (constants.includes(token.type)) {
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

    }, {
        key: 'arraycolumns',
        value: function arraycolumns() {
            var columns = [this.arrayrows()];

            while (this.lookahead.type === _Constants.TOKENS.SEMICOLON) {
                this.match(_Constants.TOKENS.SEMICOLON);

                var column = this.arrayrows();

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

    }, {
        key: 'arrayrows',
        value: function arrayrows() {
            var rows = [this.expr()];

            while (this.lookahead.type === _Constants.TOKENS.COMMA) {
                this.match(_Constants.TOKENS.COMMA);

                var row = this.expr();

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

    }, {
        key: 'formula',
        value: function formula() {
            var token = this.lookahead;
            var name = null;

            if (token.type === _Constants.TOKENS.SHEET) {
                this.match(_Constants.TOKENS.SHEET);
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

    }, {
        key: 'reference',
        value: function reference() {
            var sheet = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

            var token = this.lookahead;

            if (this.nextToken().type === _Constants.TOKENS.LPAREN) {
                this.match(_Constants.TOKENS.ID);
                this.match(_Constants.TOKENS.LPAREN);

                var params = this.parameters();

                this.match(_Constants.TOKENS.RPAREN);

                return new _ast.FunctionCall(token.value, params);
            } else if (token.type === _Constants.TOKENS.RANGE) {
                this.match(_Constants.TOKENS.RANGE);

                return new _ast.RangeReference(token, sheet);
            }

            this.match(_Constants.TOKENS.ID);

            return new _ast.CellIdentifier(token.value, sheet);
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

    }, {
        key: 'parameters',
        value: function parameters() {
            var params = [];

            while (this.lookahead.type !== _Constants.TOKENS.RPAREN && this.lookahead.type !== _Constants.TOKENS.EOL) {
                var param = this.expr();

                params.push(param);

                if (this.lookahead.type === _Constants.TOKENS.COMMA) {
                    this.match(_Constants.TOKENS.COMMA);
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

    }, {
        key: 'constant',
        value: function constant() {
            var token = this.lookahead;
            var node = void 0;

            if (token.type === _Constants.TOKENS.NUMBER) {
                this.match(_Constants.TOKENS.NUMBER);
                node = new _ast.NumberConstant(token.value);
            } else if (token.type === _Constants.TOKENS.STRING) {
                this.match(_Constants.TOKENS.STRING);
                node = new _ast.StringConstant(token.value);
            } else if (token.type === _Constants.TOKENS.BOOLEAN) {
                this.match(_Constants.TOKENS.BOOLEAN);
                node = new _ast.BooleanConstant(token.value);
            } else if (token.type === _Constants.TOKENS.ERROR) {
                this.match(_Constants.TOKENS.ERROR);
                node = new _ast.ErrorConstant(token.value);
            }

            return node;
        }

        /**
         * Get the next token
         * @return {Token} Next token
         */

    }, {
        key: 'nextToken',
        value: function nextToken() {
            return this.lexer.peek();
        }

        /**
         * Match the current token and move to the next.
         * @param {string} tokenType - Token type.
         * @throws Will throw an error if is a invalid token.
         */

    }, {
        key: 'match',
        value: function match(tokenType) {
            if (this.lookahead.type === tokenType) {
                this.lookahead = this.lexer.next();
            } else {
                throw new SyntaxError('Invalid syntax. Expecting "' + tokenType + '"');
            }
        }

        /**
         * Parse a list of tokens.
         * @throws Will throw an error if is a invalid token.
         * @return {AST} Abstract Syntax tree.
         */

    }, {
        key: 'parse',
        value: function parse() {
            if (this.lookahead === null) {
                return null;
            }

            var node = this.start();

            if (this.lookahead.type !== _Constants.TOKENS.EOL) {
                throw new SyntaxError('Invalid syntax. Expecting end of line.');
            }

            return node;
        }

        /**
         * Set a new Lexer.
         * @param {Lexer} value - Lexical analyzer object.
         */

    }, {
        key: 'lexer',
        set: function set(value) {
            this._lexer = value;
            if (this._lexer) {
                this.lookahead = this._lexer.next();
            } else {
                this.lookahead = null;
            }
        },
        get: function get() // eslint-disable-line require-jsdoc
        {
            return this._lexer;
        }
    }]);

    return Parser;
}();

Parser.displayName = 'Parser';
exports.default = Parser;