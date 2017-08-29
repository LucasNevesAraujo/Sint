import expect from 'expect.js';
import {
    Lexer,
    Parser,
    Interpreter,
    DataGrid,
} from '../../src/parser';

describe('Interpreter', () =>
{
    const interpreter = new Interpreter();

    describe('run', () =>
    {
        it('should execute, or parse and execute, a tree', () =>
        {
            const code = '=1+2';
            const lexer = new Lexer(code);
            const parser = new Parser(lexer);
            const tree = parser.parse();
            const result = interpreter.run(code);

            expect(result).to.be.equal(interpreter.run(tree));
            expect(result).to.be.equal(3);

            const data = new DataGrid({ 'SINT.ME': 'This is me' });
            const functions = {
                'SINT.USER': (number) => ` and this is user number ${number}`,
            };
            const code2 = '=SINT.ME & SINT.USER(1)';
            const result2 = 'This is me and this is user number 1';
            const interpreter2 = new Interpreter(data, functions);

            expect(interpreter2.run(code2)).to.be.equal(result2);
        });

        it('should return correct value for constants', () =>
        {
            expect(interpreter.run()).to.be.equal(null);
            expect(interpreter.run('')).to.be.equal(null);
            expect(interpreter.run('   ')).to.be.equal('   ');
            expect(interpreter.run('1')).to.be.equal(1);
            expect(interpreter.run('-2')).to.be.equal(-2);
            expect(interpreter.run('1032.23423')).to.be.equal(1032.23423);
            expect(interpreter.run('some text')).to.be.equal('some text');
            expect(interpreter.run('tRue')).to.be.equal(true);
            expect(interpreter.run('False')).to.be.equal(false);
        });

        it('should return correct value for Binary operations', () =>
        {
            expect(interpreter.run('=1 + 2')).to.be.equal(3);
            expect(interpreter.run('=-67')).to.be.equal(-67);
            expect(interpreter.run('=+73')).to.be.equal(73);
            expect(interpreter.run('= 10.3 + 2.9')).to.be.eql(13.200000000000001);
            expect(interpreter.run('=-7 + -5')).to.be.equal(-12);
            expect(interpreter.run('=5 - 6')).to.be.equal(-1);
            expect(interpreter.run('=10 / 5')).to.be.equal(2);
            expect(interpreter.run('=2 * 3')).to.be.equal(6);
            expect(interpreter.run('=(2 * 3) - (5 + (2/2))')).to.be.equal(0);
            expect(interpreter.run('=2 ^ 4')).to.be.equal(16);
            expect(interpreter.run('=2 = 2')).to.be.equal(true);
            expect(interpreter.run('=2 <> 2')).to.be.equal(false);
            expect(interpreter.run('=1 > 2')).to.be.equal(false);
            expect(interpreter.run('=1 < 2')).to.be.equal(true);
            expect(interpreter.run('=1 >= 1')).to.be.equal(true);
            expect(interpreter.run('=1 <= 0')).to.be.equal(false);
            expect(interpreter.run('="1" & "2"')).to.be.equal('12');
            // expect(interpreter.run('=FalSe & 1 & 2 & True')).to.be.equal('FALSE12TRUE');
            expect(interpreter.run('=7%')).to.be.equal(0.07);
            expect(interpreter.run('=-7%')).to.be.equal(-0.07);
        });

        it('should return correct value for Binary operations on function calls', () =>
        {
            expect(interpreter.run('=(((Sum((1),2,3))))')).to.be.equal(6);
            expect(interpreter.run('=Sum(1,2,3) * 4')).to.be.equal(24);
            expect(interpreter.run('=-Sum(1,2,3) * 4')).to.be.equal(-24);
            expect(interpreter.run('=(((Sum((1),2,3)))) * -5 / 2 + 1')).to.be.equal(-14);
            expect(interpreter.run('=Sum(1,2,3)%')).to.be.equal(0.06);
            expect(interpreter.run('=(Sum(1,2,3) * 4)')).to.be.equal(24);
            expect(interpreter.run('=-(Sum(1,2,3) * 4)')).to.be.equal(-24);
            expect(interpreter.run('=(Sum(1,2,3) * 4)%')).to.be.equal(0.24);
            expect(interpreter.run('=-(Sum(1,2,3) * 4)%')).to.be.equal(-0.24);
        });

        it('should return correct value for function calls, with cell', () =>
        {
            const data = new DataGrid({ A1: 'Some text' });

            expect(interpreter.run('=ISTEXT(CONCAT(A1, A1, 1, true))', data)).to.be.equal(true);
        });

        it('should return correct value for function calls, with range', () =>
        {
            const data = new DataGrid({ A1: 2, A2: 4, A3: 6 });

            expect(interpreter.run('=SUM($A$1:$A$3)', data)).to.be.equal(12);
            expect(interpreter.run('=SUM($A$1:$A$3, 5, 7, $A$1:$A$3)', data)).to.be.equal(36);
            expect(interpreter.run('=AVERAGE($A$1:$A$3)', data)).to.be.equal(4);
            expect(interpreter.run('=AVERAGE($A$1:$A$3, 7, $A$1:$A$3)', data)).to.be.equal(4.428571428571429);
            expect(interpreter.run('=COUNT($A$1:$A$3)', data)).to.be.equal(3);
            expect(interpreter.run('=COUNT($A$1:$A$3, 10.6, "Text", true, $A$1:$A$3)', data)).to.be.equal(7);
            expect(interpreter.run('=COUNTA($A$1:$A$3, 10.6, "Text", true, $A$1:$A$3)', data)).to.be.equal(9);
            expect(interpreter.run('=MAX($A$1:$A$3, 3, "Text", true, $A$1:$A$3)', data)).to.be.equal(6);
            expect(interpreter.run('=MIN($A$1:$A$3, 3, "-1", true, $A$1:$A$3)', data)).to.be.equal(2);
            expect(interpreter.run('=CONCATENATE($A$1:$A$3, "Text", true, $A$1:$A$3)', data)).to.be.equal('246TextTRUE246');
            expect(interpreter.run('=OR($A$1:$A$3, false)', data)).to.be.equal(true);
            expect(interpreter.run('=AND($A$1:$A$3, false)', data)).to.be.equal(false);
        });

        it('should return correct value for function calls', () =>
        {
            expect(interpreter.run('=SUM()')).to.be.equal(0);
            expect(interpreter.run('=SUM(2)')).to.be.equal(2);
            expect(interpreter.run('=SUM( SUM( SUM(1,1), 2), SUM(3,3))')).to.be.equal(10);
        });

        it('return correct value for constant array', () =>
        {
            expect(interpreter.run('={0}')).to.be.eql([[0]]);
            expect(interpreter.run('={1,2}')).to.be.eql([[1, 2]]);
            expect(interpreter.run('={1,2;3,4}')).to.be.eql([[1, 2], [3, 4]]);

            const formula = '={1,2,3;4,5,-SUM(1,2)%;7,8,J14}';
            const data = new DataGrid({ J14: 8 });
            const result = [
                [1, 2, 3],
                [4, 5, -0.03],
                [7, 8, 8],
            ];

            expect(interpreter.run(formula, data)).to.be.eql(result);
        });
    });
});
