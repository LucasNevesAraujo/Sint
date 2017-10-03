import expect from 'expect.js';
import { TOKENS } from '../../src/Constants';
import { Token, Lexer, Parser } from '../../src/parser';
import {
    FunctionCall,
    CellIdentifier,
    RangeReference,
    BinOp,
    PostfixOp,
    NumberConstant,
    StringConstant,
    BooleanConstant,
} from '../../src/parser/ast';

describe('Parser', () =>
{
    const lexer = new Lexer();
    const parser = new Parser();
    const OPERATORS = {
        '+': TOKENS.PLUS,
        '-': TOKENS.MINUS,
        '*': TOKENS.MULT,
        '/': TOKENS.DIV,
        '^': TOKENS.POW,
        '<': TOKENS.LT,
        '>': TOKENS.GT,
        '=': TOKENS.EQ,
        '<=': TOKENS.LE,
        '>=': TOKENS.GE,
        '<>': TOKENS.NE,
        '&': TOKENS.CONCAT,
    };

    function parseText(text)
    {
        lexer.text = text;
        parser.lexer = lexer;

        return parser.parse();
    }

    describe('parse', () =>
    {
        it('should parse constants', () =>
        {
            expect(parseText('1.2')).to.be.eql(new NumberConstant(1.2));
            expect(parseText('-10.6')).to.be.eql(new NumberConstant(-10.6));
            expect(parseText('Some text')).to.be.eql(new StringConstant('Some text'));
            expect(parseText('trUe')).to.be.eql(new BooleanConstant(true));
        });

        it('should parse constants, after equal sign', () =>
        {
            expect(parseText('=1.2')).to.be.eql(new NumberConstant(1.2));
            expect(parseText('="Some text"')).to.be.eql(new StringConstant('Some text'));
            expect(parseText('=FaLse')).to.be.eql(new BooleanConstant(false));
        });

        it('should parse operations', () =>
        {
            const list = OPERATORS;
            let formula;

            for (const op in list)
            {
                const type = OPERATORS[op];

                formula = `=1 ${op} 2`;
                expect(parseText(formula)).to.be.eql(
                    new BinOp(
                        new NumberConstant(1),
                        new Token(type, op),
                        new NumberConstant(2)
                    )
                );

                formula = `="1123.4" ${op} 3`;
                expect(parseText(formula)).to.be.eql(
                    new BinOp(
                        new StringConstant('1123.4'),
                        new Token(type, op),
                        new NumberConstant(3)
                    )
                );

                formula = `=TRUE ${op} 4`;
                expect(parseText(formula)).to.be.eql(
                    new BinOp(
                        new BooleanConstant(true),
                        new Token(type, op),
                        new NumberConstant(4)
                    )
                );

                formula = `=2 ${op} 3`;
                expect(parseText(formula)).to.be.eql(
                    new BinOp(
                        new NumberConstant(2),
                        new Token(type, op),
                        new NumberConstant(3)
                    )
                );

                formula = `=1 ${op} 7`;
                expect(parseText(formula)).to.be.eql(
                    new BinOp(
                        new NumberConstant(1),
                        new Token(type, op),
                        new NumberConstant(7)
                    )
                );
            }

            formula = `=7%`;
            expect(parseText(formula)).to.be.eql(
                new PostfixOp(
                    new Token(TOKENS.PERCENT, '%'),
                    new NumberConstant(7)
                )
            );

            // Wrong operator
            lexer.text = `=(1 <! 2)`;
            parser.lexer = lexer;

            expect(parser.parse).to.throwError();
        });

        it('should parse sheet cells', () =>
        {
            expect(parseText('=Sheet1!B1')).to.be.eql(
                new CellIdentifier('B1', 'SHEET1')
            );
            expect(parseText('=\'Some sheet\'!B1')).to.be.eql(
                new CellIdentifier('B1', 'SOME SHEET')
            );
            expect(parseText('=\'Some sheet\'!B1:A3')).to.be.eql(
                new RangeReference(new Token(TOKENS.RANGE, 'B1:A3'), 'SOME SHEET')
            );
        });

        it('should parse function calls', () =>
        {
            expect(parseText('=Sum()')).to.be.eql(
                new FunctionCall('SUM', [])
            );
            expect(parseText('=Add(1)')).to.be.eql(
                new FunctionCall('ADD', [
                    new NumberConstant(1),
                ])
            );
            expect(parseText('=CONcAT(1,"olá",true)')).to.be.eql(
                new FunctionCall('CONCAT', [
                    new NumberConstant(1),
                    new StringConstant('olá'),
                    new BooleanConstant(true),
                ])
            );
            expect(parseText('=Sum(SUM(1))')).to.be.eql(
                new FunctionCall('SUM', [
                    new FunctionCall('SUM', [
                        new NumberConstant(1),
                    ]),
                ])
            );
            expect(parseText('=ISTEXT(A1)')).to.be.eql(
                new FunctionCall('ISTEXT', [
                    new CellIdentifier('A1'),
                ])
            );
            expect(parseText('=ISTEXT(SUM(A1))')).to.be.eql(
                new FunctionCall('ISTEXT', [
                    new FunctionCall('SUM', [
                        new CellIdentifier('A1'),
                    ]),
                ])
            );

            // It should not enter on an infinite loop because of a missing '('
            lexer.text = '=IF(1 > 2, "Greater", "Lesser"';
            parser.lexer = lexer;
            expect(parser.parse).to.throwError();

            lexer.text = '=IF(';
            parser.lexer = lexer;
            expect(parser.parse).to.throwError();
        });

        describe('operator precedence', () =>
        {
            describe('^', () =>
            {
                it('should have higher precedence than multiplication', () =>
                {
                    const formula = `= 4 * 2 ^ 7`;

                    expect(parseText(formula)).to.be.eql(
                        new BinOp(
                            new NumberConstant(4),
                            new Token(TOKENS.MULT, '*'),
                            new BinOp(
                                new NumberConstant(2),
                                new Token(TOKENS.POW, '^'),
                                new NumberConstant(7)
                            )
                        )
                    );
                });
            });

            describe('&', () =>
            {
                it('should have higher precedence than addition', () =>
                {
                    const formula = `= 4 & 2 + 7`;

                    expect(parseText(formula)).to.be.eql(
                        new BinOp(
                            new NumberConstant(4),
                            new Token(TOKENS.CONCAT, '&'),
                            new BinOp(
                                new NumberConstant(2),
                                new Token(TOKENS.PLUS, '+'),
                                new NumberConstant(7)
                            )
                        )
                    );
                });
            });
        });
    });
});
