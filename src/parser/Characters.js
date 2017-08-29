/**
 * Iterable list of characters.
 */
export default class Characters
{
    /**
    * Creates a Characters objects from text.
    * @param {string} [text] - The text source.
    */
    constructor(text = '')
    {
        this.text = text;
    }

    /**
     * Advance to the next character.
     * @return {string} Next character.
     */
    advance()
    {
        this.pointer++;

        return this.current;
    }

    /**
     * Peek the next character without advancing.
     * @return {string} Next character.
     */
    get peek()
    {
        return this._text[this.pointer + 1];
    }

    /**
     * Returns true if pointer is equal or greater than text length.
     * @return {boolean} Did pointer reach the last position?
     */
    get end()
    {
        return this.pointer >= this._text.length;
    }

    /**
     * Returns the first character of text.
     * @return {string} First text character.
     */
    get start()
    {
        return this._text[0];
    }

    /**
     * Get current character
     * @readonly
     * @return {string} Current character.
     */
    get current()
    {
        return this._text[this.pointer];
    }

    /**
     * Set a new text and set pointer to zero.
     * @param {string} [value] - Code content.
     */
    set text(value)
    {
        this._text = String(value);
        this.pointer = 0;
    }

    get text() // eslint-disable-line require-jsdoc
    {
        return this._text;
    }

    /**
     * Returns true if the current character is a white space.
     * @return {boolean} True if is a white space.
     */
    isWhitespace()
    {
        return (/^\s+$/).test(this.current);
    }

    /**
     * Returns true if the current character is alphabetic.
     * @return {boolean} True if is a alphabetic.
     */
    isAlpha()
    {
        return (/^[a-zA-Z]+$/).test(this.current);
    }

    /**
     * Returns true if the current character is a digit.
     * @return {boolean} True if is a digit.
     */
    isDigit()
    {
        return (/^[0-9]+$/).test(this.current);
    }

    /**
     * Returns true if the current character is a valid Identifier character.
     * @return {boolean} True if is a valid identifier.
     */
    isIdentifier()
    {
        return (this.isAlpha() || this.isDigit() || (/^[\$\.]+$/).test(this.current));
    }
}
