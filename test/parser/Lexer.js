import expect from 'expect.js';
import { Lexer, Token } from '../../src/parser';
import { TOKENS, OPERATORS, ERRORS } from '../../src/Constants';

describe('Lexer', () =>
{
    const lexer = new Lexer();

    describe('next', () =>
    {
        it('should return correct constant', () =>
        {
            lexer.text = '';
            expect(lexer.next().type).to.be.equal(TOKENS.EOL);

            lexer.text = 'Some text';
            expect(lexer.next().type).to.be.equal(TOKENS.STRING);

            lexer.text = '1';
            expect(lexer.next().type).to.be.equal(TOKENS.NUMBER);

            lexer.text = '100';
            expect(lexer.next().type).to.be.equal(TOKENS.NUMBER);

            lexer.text = '100.50';
            expect(lexer.next().type).to.be.equal(TOKENS.NUMBER);

            lexer.text = '   100.50  ';
            expect(lexer.next().type).to.be.equal(TOKENS.NUMBER);

            lexer.text = '100.50.1';
            expect(lexer.next().type).to.be.equal(TOKENS.STRING);

            lexer.text = 'TrUe';
            expect(lexer.next()).to.be.eql(new Token(TOKENS.BOOLEAN, true));

            lexer.text = 'FalSe';
            expect(lexer.next()).to.be.eql(new Token(TOKENS.BOOLEAN, false));

            lexer.text = ' true';
            expect(lexer.next()).to.be.eql(new Token(TOKENS.STRING, ' true'));

            lexer.text = '\'100.50';
            expect(lexer.next()).to.be.eql(new Token(TOKENS.STRING, '100.50'));

            lexer.text = '\'100.50\'';
            expect(lexer.next()).to.be.eql(new Token(TOKENS.STRING, '100.50\''));

            lexer.text = '\'TRUE';
            expect(lexer.next()).to.be.eql(new Token(TOKENS.STRING, 'TRUE'));

            lexer.text = '\'{1,2,3;4,5,6}';
            expect(lexer.next()).to.be.eql(new Token(TOKENS.STRING, '{1,2,3;4,5,6}'));
        });

        it('should return a positive number', () =>
        {
            lexer.text = '=1';
            lexer.next();
            expect(lexer.next()).to.be.eql(new Token(TOKENS.NUMBER, 1));

            lexer.text = '=100';
            lexer.next();
            expect(lexer.next()).to.be.eql(new Token(TOKENS.NUMBER, 100));

            lexer.text = '=1.2';
            lexer.next();
            expect(lexer.next()).to.be.eql(new Token(TOKENS.NUMBER, 1.2));

            lexer.text = '=15.234';
            lexer.next();
            expect(lexer.next()).to.be.eql(new Token(TOKENS.NUMBER, 15.234));
        });

        it('should return an unary prefix number', () =>
        {
            lexer.text = '=+1';
            lexer.next();
            expect(lexer.next()).to.be.eql(new Token(TOKENS.PLUS, '+'));
            expect(lexer.next()).to.be.eql(new Token(TOKENS.NUMBER, 1));

            lexer.text = '=-2';
            lexer.next();
            expect(lexer.next()).to.be.eql(new Token(TOKENS.MINUS, '-'));
            expect(lexer.next()).to.be.eql(new Token(TOKENS.NUMBER, 2));
        });

        it('should return a string', () =>
        {
            lexer.text = '="Hello"';
            lexer.next();
            expect(lexer.next()).to.be.eql(new Token(TOKENS.STRING, 'Hello'));

            lexer.text = '="Hello I\'m a Lexer."';
            lexer.next();
            expect(lexer.next()).to.be.eql(new Token(TOKENS.STRING, 'Hello I\'m a Lexer.'));

            // Return a string even it doesn't have a close quote.
            lexer.text = '="Hello';
            lexer.next();
            expect(lexer.next()).to.be.eql(new Token(TOKENS.STRING, 'Hello'));
        });

        it('should return an operator', () =>
        {
            const list = OPERATORS;

            for (const op in list)
            {
                const type = OPERATORS[op];

                lexer.text = `=1 ${op} 2`;
                expect(lexer.next()).to.be.eql(new Token(TOKENS.EQ, '='));
                expect(lexer.next()).to.be.eql(new Token(TOKENS.NUMBER, 1));
                expect(lexer.next()).to.be.eql(new Token(type, op));
                expect(lexer.next()).to.be.eql(new Token(TOKENS.NUMBER, 2));
                expect(lexer.next()).to.be.eql(new Token(TOKENS.EOL));
            }

            // Concatenate
            lexer.text = `="Name " & " Lastname"`;
            lexer.next(); // Skip equal sign
            expect(lexer.next().value).to.be.equal('Name ');
            expect(lexer.next()).to.be.eql(new Token(TOKENS.CONCAT, '&'));
            expect(lexer.next().value).to.be.equal(' Lastname');

            // Parentheses
            lexer.text = `=(1 <> 2)`;
            lexer.next(); // Skip equal sign
            expect(lexer.next()).to.be.eql(new Token(TOKENS.LPAREN, '('));
            expect(lexer.next().value).to.be.equal(1);
            expect(lexer.next().value).to.be.equal('<>');
            expect(lexer.next().value).to.be.equal(2);
            expect(lexer.next()).to.be.eql(new Token(TOKENS.RPAREN, ')'));
        });

        it('should return a boolean', () =>
        {
            lexer.text = '=TrUe';
            lexer.next(); // Skip equal sign
            expect(lexer.next()).to.be.eql(new Token(TOKENS.BOOLEAN, true));

            lexer.text = '=FalSe';
            lexer.next(); // Skip equal sign
            expect(lexer.next()).to.be.eql(new Token(TOKENS.BOOLEAN, false));

            lexer.text = '= true';
            lexer.next(); // Skip equal sign
            expect(lexer.next()).to.be.eql(new Token(TOKENS.BOOLEAN, true));

            lexer.text = '=  false \n';
            lexer.next(); // Skip equal sign
            expect(lexer.next()).to.be.eql(new Token(TOKENS.BOOLEAN, false));
        });

        it('should return an identifier', () =>
        {
            lexer.text = '=AA78';
            lexer.next(); // Skip equal sign
            expect(lexer.next()).to.be.eql(new Token(TOKENS.ID, 'AA78'));

            lexer.text = '=SUM(A1)';
            lexer.next(); // Skip equal sign
            expect(lexer.next()).to.be.eql(new Token(TOKENS.ID, 'SUM'));
            expect(lexer.next()).to.be.eql(new Token(TOKENS.LPAREN, '('));
            expect(lexer.next()).to.be.eql(new Token(TOKENS.ID, 'A1'));
            expect(lexer.next()).to.be.eql(new Token(TOKENS.RPAREN, ')'));

            lexer.text = '=SUM(A1, B2, C3:D6)';
            lexer.next(); // Skip equal sign
            expect(lexer.next()).to.be.eql(new Token(TOKENS.ID, 'SUM'));
            expect(lexer.next()).to.be.eql(new Token(TOKENS.LPAREN, '('));
            expect(lexer.next()).to.be.eql(new Token(TOKENS.ID, 'A1'));
            expect(lexer.next()).to.be.eql(new Token(TOKENS.COMMA, ','));
            expect(lexer.next()).to.be.eql(new Token(TOKENS.ID, 'B2'));
            expect(lexer.next()).to.be.eql(new Token(TOKENS.COMMA, ','));
            expect(lexer.next()).to.be.eql(new Token(TOKENS.RANGE, 'C3:D6'));
            expect(lexer.next()).to.be.eql(new Token(TOKENS.RPAREN, ')'));

            lexer.text = '=Sheet1!A1';
            lexer.next(); // Skip equal sign
            expect(lexer.next()).to.be.eql(new Token(TOKENS.SHEET, 'SHEET1'));
            expect(lexer.next()).to.be.eql(new Token(TOKENS.ID, 'A1'));

            lexer.text = '=_Sheet1!A1';
            lexer.next(); // Skip equal sign
            expect(lexer.next()).to.be.eql(new Token(TOKENS.SHEET, '_SHEET1'));
            expect(lexer.next()).to.be.eql(new Token(TOKENS.ID, 'A1'));
        });

        it('should return a cell or reference', () =>
        {
            lexer.text = '=B5';
            expect(lexer.next()).to.be.eql(new Token(TOKENS.EQ, '='));
            expect(lexer.next()).to.be.eql(new Token(TOKENS.ID, 'B5'));

            lexer.text = '=B$5';
            expect(lexer.next()).to.be.eql(new Token(TOKENS.EQ, '='));
            expect(lexer.next()).to.be.eql(new Token(TOKENS.ID, 'B$5'));

            lexer.text = '=$B5';
            expect(lexer.next()).to.be.eql(new Token(TOKENS.EQ, '='));
            expect(lexer.next()).to.be.eql(new Token(TOKENS.ID, '$B5'));

            lexer.text = '=$B$5';
            expect(lexer.next()).to.be.eql(new Token(TOKENS.EQ, '='));
            expect(lexer.next()).to.be.eql(new Token(TOKENS.ID, '$B$5'));

            lexer.text = '=A1:C5';
            expect(lexer.next()).to.be.eql(new Token(TOKENS.EQ, '='));
            expect(lexer.next()).to.be.eql(new Token(TOKENS.RANGE, 'A1:C5'));

            lexer.text = '=$B$5:$C$4';
            expect(lexer.next()).to.be.eql(new Token(TOKENS.EQ, '='));
            expect(lexer.next()).to.be.eql(new Token(TOKENS.RANGE, '$B$5:$C$4'));

            lexer.text = '=A:C';
            expect(lexer.next()).to.be.eql(new Token(TOKENS.EQ, '='));
            expect(lexer.next()).to.be.eql(new Token(TOKENS.RANGE, 'A:C'));

            lexer.text = '=1:3';
            expect(lexer.next()).to.be.eql(new Token(TOKENS.EQ, '='));
            expect(lexer.next()).to.be.eql(new Token(TOKENS.RANGE, '1:3'));
        });

        it('should return EOF on empty formula', () =>
        {
            lexer.test = '=';
            expect(lexer.next().type).to.be.equal(TOKENS.EOL);

            lexer.test = '=    \n';
            expect(lexer.next().type).to.be.equal(TOKENS.EOL);

            lexer.test = '';
            expect(lexer.next().type).to.be.equal(TOKENS.EOL);

            lexer.test = '    \n';
            expect(lexer.next().type).to.be.equal(TOKENS.EOL);

            lexer.test = '\'';
            expect(lexer.next().type).to.be.equal(TOKENS.EOL);

            lexer.test = '\'   ';
            expect(lexer.next().type).to.be.equal(TOKENS.EOL);
        });

        it('should return invalid character error', () =>
        {
            lexer.text = '=1|3';
            lexer.next(); // Skip equal sign
            lexer.next(); // Skip number
            expect(lexer.next).to.throwError();

            lexer.text = '="1|3"';
            lexer.next(); // Skip equal sign
            expect(lexer.next()).to.be.eql(new Token(TOKENS.STRING, '1|3'));
        });

        it('should return valid tokens for complex functions', () =>
        {
            // Complex functions
            lexer.text = '=(B8/48)*15';
            expect(lexer.next()).to.be.eql(new Token(TOKENS.EQ, '='));
            expect(lexer.next()).to.be.eql(new Token(TOKENS.LPAREN, '('));
            expect(lexer.next()).to.be.eql(new Token(TOKENS.ID, 'B8'));
            expect(lexer.next()).to.be.eql(new Token(TOKENS.DIV, '/'));
            expect(lexer.next()).to.be.eql(new Token(TOKENS.NUMBER, '48'));
            expect(lexer.next()).to.be.eql(new Token(TOKENS.RPAREN, ')'));
            expect(lexer.next()).to.be.eql(new Token(TOKENS.MULT, '*'));
            expect(lexer.next()).to.be.eql(new Token(TOKENS.NUMBER, '15'));

            lexer.text = '=IF(AND(R11=1,R14=TRUE),G19,0)';
            expect(lexer.next()).to.be.eql(new Token(TOKENS.EQ, '='));
            expect(lexer.next()).to.be.eql(new Token(TOKENS.ID, 'IF'));
            expect(lexer.next()).to.be.eql(new Token(TOKENS.LPAREN, '('));
            expect(lexer.next()).to.be.eql(new Token(TOKENS.ID, 'AND'));
            expect(lexer.next()).to.be.eql(new Token(TOKENS.LPAREN, '('));
            expect(lexer.next()).to.be.eql(new Token(TOKENS.ID, 'R11'));
            expect(lexer.next()).to.be.eql(new Token(TOKENS.EQ, '='));
            expect(lexer.next()).to.be.eql(new Token(TOKENS.NUMBER, 1));
            expect(lexer.next()).to.be.eql(new Token(TOKENS.COMMA, ','));
            expect(lexer.next()).to.be.eql(new Token(TOKENS.ID, 'R14'));
            expect(lexer.next()).to.be.eql(new Token(TOKENS.EQ, '='));
            expect(lexer.next()).to.be.eql(new Token(TOKENS.BOOLEAN, true));
            expect(lexer.next()).to.be.eql(new Token(TOKENS.RPAREN, ')'));
            expect(lexer.next()).to.be.eql(new Token(TOKENS.COMMA, ','));
            expect(lexer.next()).to.be.eql(new Token(TOKENS.ID, 'G19'));
            expect(lexer.next()).to.be.eql(new Token(TOKENS.COMMA, ','));
            expect(lexer.next()).to.be.eql(new Token(TOKENS.NUMBER, 0));
            expect(lexer.next()).to.be.eql(new Token(TOKENS.RPAREN, ')'));

            lexer.text = '=Sheet1!B1';
            expect(lexer.next()).to.be.eql(new Token(TOKENS.EQ, '='));
            expect(lexer.next()).to.be.eql(new Token(TOKENS.SHEET, 'SHEET1'));
            expect(lexer.next()).to.be.eql(new Token(TOKENS.ID, 'B1'));

            lexer.text = `='Some sheet'!b1`;
            expect(lexer.next()).to.be.eql(new Token(TOKENS.EQ, '='));
            expect(lexer.next()).to.be.eql(new Token(TOKENS.SHEET, 'SOME SHEET'));
            expect(lexer.next()).to.be.eql(new Token(TOKENS.ID, 'B1'));

            // Invalid sheet name
            lexer.text = `=''!b1`;
            expect(lexer.next()).to.be.eql(new Token(TOKENS.EQ, '='));
            expect(lexer.next).to.throwError();

            // Invalid sheet name
            lexer.text = `='    '!b1`;
            expect(lexer.next()).to.be.eql(new Token(TOKENS.EQ, '='));
            expect(lexer.next).to.throwError();
        });

        it('should return correct error constant', () =>
        {
            for (const index in ERRORS)
            {
                const error = ERRORS[index];

                lexer.text = error;
                expect(lexer.next()).to.be.eql(new Token(TOKENS.ERROR, error));

                lexer.text = `=${error}`;
                lexer.next(); // Skip equal sign
                expect(lexer.next()).to.be.eql(new Token(TOKENS.ERROR, error));
            }

            lexer.text = `  #DIV/0!    `;
            expect(lexer.next()).to.be.eql(new Token(TOKENS.ERROR, ERRORS.DIV));

            lexer.text = `#SOMEERROR!`;
            expect(lexer.next()).to.be.eql(new Token(TOKENS.STRING, '#SOMEERROR!'));

            lexer.text = `=SUM(#Div/0!, #name?, #N/a) + COUNT(#NULL!, #num!, #REF!, #VALUE!)`;
            lexer.next(); // Skip equal sign
            lexer.next(); // Skip SUM
            lexer.next(); // Skip parentheses
            expect(lexer.next()).to.be.eql(new Token(TOKENS.ERROR, ERRORS.DIV));
            lexer.next(); // Skip comma
            expect(lexer.next()).to.be.eql(new Token(TOKENS.ERROR, ERRORS.NAME));
            lexer.next(); // Skip comma
            expect(lexer.next()).to.be.eql(new Token(TOKENS.ERROR, ERRORS.NA));
            lexer.next(); // Skip parentheses
            lexer.next(); // Skip plus
            lexer.next(); // Skip COUNT
            lexer.next(); // Skip parentheses
            expect(lexer.next()).to.be.eql(new Token(TOKENS.ERROR, ERRORS.NULL));
            lexer.next(); // Skip comma
            expect(lexer.next()).to.be.eql(new Token(TOKENS.ERROR, ERRORS.NUM));
            lexer.next(); // Skip comma
            expect(lexer.next()).to.be.eql(new Token(TOKENS.ERROR, ERRORS.REF));
            lexer.next(); // Skip comma
            expect(lexer.next()).to.be.eql(new Token(TOKENS.ERROR, ERRORS.VALUE));
            expect(lexer.next()).to.be.eql(new Token(TOKENS.RPAREN, ')'));
        });
    });
});
