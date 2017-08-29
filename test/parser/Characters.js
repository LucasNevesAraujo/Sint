import expect from 'expect.js';
import Characters from '../../src/parser/Characters';

describe('Characters', () =>
{
    describe('current', () =>
    {
        it('should work with empty string', () =>
        {
            const char = new Characters();

            expect(char.current).to.be(undefined);
        });

        it('should not enter in a infinite loop', () =>
        {
            const text = 'some text or code.';
            const char = new Characters(text);
            let result = '';

            while (!char.end)
            {
                result += char.current;
                char.advance();
            }

            expect(result).to.be.equal(text);
        });
    });

    describe('isAlpha', () =>
    {
        it('should return true', () =>
        {
            const char = new Characters('abc');

            while (!char.end)
            {
                expect(char.isAlpha()).to.be.ok();
                char.advance();
            }
        });
    });

    describe('isDigit', () =>
    {
        it('should return true', () =>
        {
            const char = new Characters('123');

            while (!char.end)
            {
                expect(char.isDigit()).to.be.ok();
                char.advance();
            }
        });
    });

    describe('isWhitespace', () =>
    {
        it('should return true', () =>
        {
            const char = new Characters(' 	\n');

            while (!char.end)
            {
                expect(char.isWhitespace()).to.be.ok();
                char.advance();
            }
        });
    });
});
