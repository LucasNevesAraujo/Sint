/**
 * A Lexical token.
 */
export default class Token
{
    /**
    * Creates a Token.
    * @param {string} type - Token Type.
    * @param {string} value - Token value.
    */
    constructor(type, value = null)
    {
        this.type = type;
        this.value = value;
    }
}
