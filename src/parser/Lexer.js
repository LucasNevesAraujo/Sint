import { TOKENS, OPERATORS, ERRORS } from './../Constants';
import Characters from './Characters';
import Token from './Token';

const START_CHAR = '=';
const UNDERSCORE = '_';
const DOLLAR_SIGN = '$';
const SINGLE_QUOTE = '\'';
const DOUBLE_QUOTE = '"';

// Error characteres
const HASH_SIGN = '#';
const EXCLAMATION_MARK = '!';
const QUESTION_MARK = '?';
const SLASH = '/';

// Returns true if it's a number or number string.
function isNumber(number)
{
    return !isNaN(parseFloat(number)) && isFinite(number);
}

/**
 * A class to do Lexical analysis.
 *
 * @extends Characters
 */
export default class Lexer extends Characters
{
    /**
    * Creates a Lexer.
    * @param {string} [text] - Code content.
    */
    constructor(text = '')
    {
        super(text);
    }

    /**
     * Skip white space characters
     */
    skipWhitespace()
    {
        while (!this.end && this.isWhitespace())
        {
            this.advance();
        }
    }

    /**
     * Returns all contents from text.
     * @return {string} Text contents.
     */
    contents()
    {
        let result = '';

        while (!this.end)
        {
            result += this.current;
            this.advance();
        }

        return result;
    }

    /**
     * Returns a constant or EOF. Constants can be Strings, numbers and Booleans.
     * @return {Token} A Constant token.
     */
    constant()
    {
        const isSingleQuoted = (this.current === SINGLE_QUOTE);
        let result;

        if (isSingleQuoted)
        {
            this.advance();
            result = this.contents();

            return new Token(TOKENS.STRING, String(result));
        }

        result = this.contents();
        if (result)
        {
            const lower = result.toUpperCase();
            const error = lower.trim();

            for (const key in ERRORS)
            {
                if (ERRORS[key] === error)
                {
                    return new Token(TOKENS.ERROR, error);
                }
            }

            if (lower === 'TRUE')
            {
                return new Token(TOKENS.BOOLEAN, true);
            }
            else if (lower === 'FALSE')
            {
                return new Token(TOKENS.BOOLEAN, false);
            }
            else if (isNumber(result))
            {
                return new Token(TOKENS.NUMBER, parseFloat(result));
            }

            return new Token(TOKENS.STRING, String(result));
        }

        return new Token(TOKENS.EOL);
    }

    /**
     * Returns a digit
     * @return {string} A Number string.
     */
    digit()
    {
        let result = '';

        while (this.isDigit())
        {
            result += this.current;
            this.advance();
        }

        return result;
    }

    /**
     * Returns a number token or a range (e.g. 1:3) token.
     * @return {Token} A Number or Range token.
     */
    number()
    {
        let result = this.digit();

        if (this.current === '.')
        {
            this.advance(); // Skip dot sign.
            result = `${result}.${this.digit()}`;
        }
        else if (this.current === ':')
        {
            this.advance(); // Skip colon sign.
            result = `${result}:${this.digit()}`;

            return new Token(TOKENS.RANGE, result);
        }
        result = parseFloat(result);

        return new Token(TOKENS.NUMBER, result);
    }

    /**
     * Returns a identifier, that can be a Function name, cell reference or range.
     * @return {string} An Identifier.
     */
    name()
    {
        let result = '';

        while (!this.end && this.isIdentifier())
        {
            result += this.current;
            this.advance();
        }

        return result.toUpperCase();
    }

    /**
     * Returns a identifier or range token.
     * @return {Token} An ID or RANGE token.
     */
    identifier()
    {
        let result = this.name();
        const isBoolean = (result === 'TRUE' || result === 'FALSE');

        // Checks if its not a function, e.g. TRUE() or FALSE().
        if (isBoolean)
        {
            this.skipWhitespace();
            if (this.current !== '(')
            {
                return new Token(TOKENS.BOOLEAN, result === 'TRUE');
            }
        }

        // Checks if it's a Range
        if (this.current === ':')
        {
            // Skip the colon mark.
            this.advance();

            const first = result;
            const last = this.name();

            result = `${first}:${last}`;

            return new Token(TOKENS.RANGE, result);
        }

        // Checks if it's a Sheet
        if (this.current === '!')
        {
            // Skip the exclamation mark.
            this.advance();

            return new Token(TOKENS.SHEET, result);
        }

        return new Token(TOKENS.ID, result);
    }

    /**
     * Returns a string.
     * @param {string} [end] - the End character.
     * @return {string} The whole string.
     */
    literal(end = DOUBLE_QUOTE)
    {
        let result = '';

        // Skip the first quote sign.
        this.advance();
        while (!this.end && this.current !== end)
        {
            result += this.current;
            this.advance();
        }

        // Skip the last quote sign.
        this.advance();

        return String(result);
    }

    /**
     * Returns a string
     * @return {Token} A String token.
     */
    string()
    {
        const result = this.literal(DOUBLE_QUOTE);

        return new Token(TOKENS.STRING, result);
    }

    /**
     * Returns a sheet token.
     * @throws Will throw an error if it's an empty sheet.
     * @return {Token} A ID token.
     */
    sheet()
    {
        const result = this.literal(SINGLE_QUOTE).trim().toUpperCase();

        if (!result.length)
        {
            throw new Error(`Empty sheet name`);
        }

        // Skip exclamation point.
        this.advance();

        return new Token(TOKENS.SHEET, result);
    }

    /**
     * Returns a Error string.
     * @throws Will throw an error if it's not a valid Error.
     * @return {Token} A Error token.
     */
    error()
    {
        const finalChars = [EXCLAMATION_MARK, QUESTION_MARK, SLASH];
        let result = '';

        while (!this.end && !finalChars.includes(this.current))
        {
            result += this.current;
            this.advance();
        }

        const isSlash = (this.current === SLASH);

        result += this.current;
        this.advance();

        if (isSlash)
        {
            switch (this.current)
            {
                // #DIV/0!
                case '0':
                    result += this.current;
                    this.advance();
                    result += this.current;
                    this.advance();
                    break;

                // #N/A
                case 'a':
                case 'A':
                    result += this.current;
                    this.advance();
                    break;
            }
        }

        result = result.toUpperCase();
        for (const key in ERRORS)
        {
            if (ERRORS[key] === result)
            {
                return new Token(TOKENS.ERROR, result);
            }
        }

        return result;
    }

    /**
     * Returns a operator
     * @return {Token} A String token.
     */
    operator()
    {
        let result = this.current;
        const next = this.advance();

        if (result === '<' && next === '=')
        {
            result += this.current;
            this.advance();
        }
        else if (result === '>' && next === '=')
        {
            result += this.current;
            this.advance();
        }
        else if (result === '<' && next === '>')
        {
            result += this.current;
            this.advance();
        }

        return new Token(OPERATORS[result], result);
    }

    /**
     * Return the next token and reset pointer.
     * @return {Token} A Token.
     */
    peek()
    {
        const oldPointer = this.pointer;
        const token = this.next();

        this.pointer = oldPointer;

        return token;
    }

    /**
     * Return the next token for a formula
     * @throws Will throw an error if is a invalid character.
     * @return {Token} A Token.
     */
    _nextToken()
    {
        // If it's the first character, skip it.
        if (this.pointer === 0)
        {
            this.advance();

            return new Token(TOKENS.EQ, START_CHAR);
        }

        while (!this.end)
        {
            // While is Whitespace, skip.
            if (this.isWhitespace())
            {
                this.skipWhitespace();
            }

            // Get numbers
            if (this.isDigit())
            {
                return this.number();
            }

            // Get identifier
            if (this.isAlpha() || this.current === UNDERSCORE || this.current === DOLLAR_SIGN)
            {
                return this.identifier();
            }

            // Get Strings
            if (this.current === DOUBLE_QUOTE)
            {
                return this.string();
            }

            // Get Sheets
            if (this.current === SINGLE_QUOTE)
            {
                return this.sheet();
            }

            // Get Error
            if (this.current === HASH_SIGN)
            {
                return this.error();
            }

            // Get Operators
            if (this.current in OPERATORS)
            {
                return this.operator();
            }

            throw new SyntaxError(`Invalid character "${this.current}"`);
        }

        return new Token(TOKENS.EOL);
    }

    /**
     * Return the next token
     * @return {Token} A Token.
     */
    next()
    {
        // Check if starts with "=".
        if (this.start === START_CHAR)
        {
            return this._nextToken();
        }

        // Return a String, Number or Boolean
        return this.constant();
    }
}
