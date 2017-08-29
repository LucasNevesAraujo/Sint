import expect from 'expect.js';
import { Interpreter } from '../../../src/parser';

describe('Formula.js Integration', () =>
{
    const interpreter = new Interpreter();

    // it('should run database functions', () =>
    // {
    // });

    it('should run date-time functions', () =>
    {
        const first = (new Date()).valueOf();
        const now = interpreter.run('=NOW()');
        const today = interpreter.run('=TODAY()');
        const last = (new Date()).valueOf();
        const date = 'DATE(2017, 07, 12)';
        const time = 'TIME(16, 11, 25)';

        expect(now).to.be.within(first, last);
        expect(interpreter.run(`=${date}`)).to.be.eql(new Date(2017, 6, 12));
        // expect(interpreter.run(`=DATEVALUE(${date})`)).to.be.equal(2017);
        expect(interpreter.run(`=DAY(${date})`)).to.be.equal(12);
        expect(interpreter.run(`=MONTH(${date})`)).to.be.equal(7);
        expect(interpreter.run(`=YEAR(${date})`)).to.be.equal(2017);
        expect(interpreter.run(`=${time}`)).to.be.equal(0.6745949074074075);
        // expect(interpreter.run(`=HOUR(${time})`)).to.be.equal(16);
        // expect(interpreter.run(`=MINUTE(${time})`)).to.be.equal(11);
        // expect(interpreter.run(`=SECOND(${time})`)).to.be.equal(25);
        expect(today).to.be.within(first, last);
    });

    // it('should run engineering functions', () =>
    // {
    // });

    // it('should run financial functions', () =>
    // {
    // });

    it('should run information functions', () =>
    {
        expect(interpreter.run('=ISBINARY(4)')).to.be.equal(false);
        expect(interpreter.run('=IsEven(4)')).to.be.equal(true);
        expect(interpreter.run('=ISLOGICAL(true)')).to.be.equal(true);
        expect(interpreter.run('=ISLOGICAL(false)')).to.be.equal(true);
        expect(interpreter.run('=ISLOGICAL(0)')).to.be.equal(false);
        expect(interpreter.run('=ISLOGICAL("")')).to.be.equal(false);
        expect(interpreter.run('=ISNonText(2)')).to.be.equal(true);
        expect(interpreter.run('=ISNonText(true)')).to.be.equal(true);
        expect(interpreter.run('=ISNonText("")')).to.be.equal(false);
        expect(interpreter.run('=ISNUMBER("122.1")')).to.be.equal(false);
        expect(interpreter.run('=IsOdd(4)')).to.be.equal(false);
        expect(interpreter.run('=IsText("")')).to.be.equal(true);
        expect(interpreter.run('=N(2)')).to.be.equal(2);
        expect(interpreter.run('=N(TRUE)')).to.be.equal(1);
        expect(interpreter.run('=N(FALSE)')).to.be.equal(0);
        expect(interpreter.run('=N("2")')).to.be.equal(0);
        expect(interpreter.run(`=TYPE(1)`)).to.be.equal(1);
        expect(interpreter.run(`=TYPE("")`)).to.be.equal(2);
        expect(interpreter.run(`=TYPE(TRUE)`)).to.be.equal(4);
        // expect(interpreter.run(`=TYPE(#REF!)`)).to.be.equal(16);
        expect(interpreter.run(`=TYPE({1,2,3})`)).to.be.equal(64);
    });

    it('should run logical functions', () =>
    {
        expect(interpreter.run('=TRUE()')).to.be.equal(true);
        expect(interpreter.run('=FALSE ()')).to.be.equal(false);
        expect(interpreter.run('=NOT(0)')).to.be.equal(true);
        expect(interpreter.run('=NOT("")')).to.be.equal(true);
        expect(interpreter.run('=NOT()')).to.be.equal(true);
        expect(interpreter.run('=NOT(2 = 2)')).to.be.equal(false);
        expect(interpreter.run('=OR(1 = 2, false, 0)')).to.be.equal(false);
        expect(interpreter.run('=AND(1 = 1, false, 0)')).to.be.equal(false);
        expect(interpreter.run('=OR(2 = 1, false, 0, 1 <> 3)')).to.be.equal(true);
        expect(interpreter.run('=AND(2 = 2, true, 1, 2 <= 3)')).to.be.equal(true);
        expect(interpreter.run('=IF(1 > 2, "Greater", "Lesser")')).to.be.equal('Lesser');
        expect(interpreter.run('=IF(1 = 1, "Equal", "Not equal")')).to.be.equal('Equal');
    });

    // it('should run lookup-reference functions', () =>
    // {
    // });

    it('should run math-trig functions', () =>
    {
        expect(interpreter.run('=ADD(56, 87)')).to.be.equal(143);
        expect(interpreter.run('=ABS(-56.87)')).to.be.equal(56.87);
        expect(interpreter.run('=ARABIC("DXXXII")')).to.be.equal(532);
        expect(interpreter.run('=DIVIDE(56, 8)')).to.be.equal(7);
        expect(interpreter.run('=MINUS(56, 87)')).to.be.equal(-31);
        expect(interpreter.run('=MULTIPLY(56, 87)')).to.be.equal(4872);
        expect(interpreter.run('=POW(56, 2)')).to.be.equal(3136);
        expect(interpreter.run('=RAND()')).to.not.be.equal(interpreter.run('=RAND()'));
        expect(interpreter.run('=RANDBETWEEN(200, 500)')).to.be.within(200, 500);
        expect(interpreter.run('=RADIANS(2)')).to.be.equal(0.03490658503988659);
        expect(interpreter.run('=ROMAN(532)')).to.be.equal('DXXXII');
        // expect(interpreter.run('=ROUND(99.44)')).to.be.equal(99); // empty second argument
        expect(interpreter.run('=ROUND(99.44, 1)')).to.be.equal(99.4);
        expect(interpreter.run('=ROUND(-99.44, 1)')).to.be.equal(-99.4);
        expect(interpreter.run('=ROUNDUP(-99.46, 1)')).to.be.equal(-99.5);
        expect(interpreter.run('=ROUNDDOWN(-99.46, 1)')).to.be.equal(-99.4);
        expect(interpreter.run('=SIGN(-99)')).to.be.equal(-1);
        expect(interpreter.run('=SIGN(0)')).to.be.equal(0);
        expect(interpreter.run('=SIGN(74)')).to.be.equal(1);
        expect(interpreter.run('=SQRT(9)')).to.be.equal(3);
        // expect(interpret('=SUM(,,,)')).to.be.equal(0); // empty aguments
        expect(interpreter.run('=SUM(1,2,3)')).to.be.equal(6);
        expect(interpreter.run('=SUM({1,2,3,4})')).to.be.equal(10);
        expect(interpreter.run('=SUM({1,2},{3,4})')).to.be.equal(10);
        expect(interpreter.run('=SUM({1},{2},{3},{4})')).to.be.equal(10);
        expect(interpreter.run('=SUMPRODUCT({1,2,3}, {4,5,6})')).to.be.equal(32);
        expect(interpreter.run('=SUMSQ({1,2,3}, 45)')).to.be.equal(2039);
        expect(interpreter.run('=MOD(10, 4)')).to.be.equal(2);
        expect(interpreter.run('=pi()')).to.be.equal(Math.PI);

        expect(interpreter.run('=GTE(5, 6)')).to.be.equal(false);
        expect(interpreter.run('=LT(5, 6)')).to.be.equal(true);
        expect(interpreter.run('=LTE(5, 6)')).to.be.equal(true);
        expect(interpreter.run('=EQ(5, 6)')).to.be.equal(false);
        expect(interpreter.run('=NE(5, 6)')).to.be.equal(true);
    });

    it('should run miscellaneous functions', () =>
    {
        const unique = [1, 2, true, false, '', 'Text', 4, ' ', 5];
        const uniqueCode = `=UNIQUE({1, 2, true, false, 2, "", "Text", 4, " ", 4, 5})`;

        expect(interpreter.run(uniqueCode)).to.be.eql(unique);
    });

    it('should run statistical functions', () =>
    {
        expect(interpreter.run('=AVERAGE(1,2,"",TRUE,#REF!,3,4)')).to.be.equal(2.5);
        expect(interpreter.run('=AVERAGEA(1,2,"",TRUE,#REF!,3,4)')).to.be.equal(1.5714285714285714);
        // expect(interpreter.run('=AVERAGEIF({1,2,2},">1",{1,2,3})')).to.be.equal(2.5); // insecure criteria
        expect(interpreter.run('=COUNT(1, 2, true, false, "", "Text", " ", 4, 5)')).to.be.equal(4);
        expect(interpreter.run('=COUNTA(1, 2, true, false, "", "Text", " ", 4, 5)')).to.be.equal(8);
        expect(interpreter.run('=COUNTIN({1, 2, true, false, "", "Text", " ", 4, 5}, 4)')).to.be.equal(1);
        expect(interpreter.run('=COUNTBLANK({1, 2, true, false, "", "Text", " ", 4, 5})')).to.be.equal(1);
        expect(interpreter.run('=COUNTUNIQUE({1, 2, true, false, 2, "", "Text", 4, " ", 4, 5})')).to.be.equal(9);
        expect(interpreter.run('=MAX(1,2,40,3,2,1)')).to.be.equal(40);
        expect(interpreter.run('=MIN(1,2,-30,3,2,1)')).to.be.equal(-30);
    });

    it('should run text functions', () =>
    {
        expect(interpreter.run('=LEFT("Some text", 3)')).to.be.equal('Som');
        expect(interpreter.run('=RIGHT("Some text", 3)')).to.be.equal('ext');
        expect(interpreter.run('=MID("Some text", 3, 2)')).to.be.equal('me');
        expect(interpreter.run('=CONCAT("Some", "text", "with", "args")')).to.be.equal('Sometext');
        expect(interpreter.run('=CONCATENATE("Some", "text", true, "args", 1)')).to.be.equal('SometextTRUEargs1');
        expect(interpreter.run('=LEN(" work sheet ")')).to.be.equal(12);
        // expect(interpreter.run('=LEN(33)')).to.be.equal(2); // return [Error: #VALUE?]
        // expect(interpreter.run('=LEN(TRUE)')).to.be.equal(4); // return [Error: #VALUE?]
        expect(interpreter.run('=trim(" work sheet ")')).to.be.equal('work sheet');
        expect(interpreter.run('=PROPER("work sheet")')).to.be.equal('Work Sheet');
        expect(interpreter.run('=LOWER(PROPER("work sheet"))')).to.be.equal('work sheet');
        expect(interpreter.run('=UPPER(PROPER("work sheet"))')).to.be.equal('WORK SHEET');
        expect(interpreter.run('=REPT("work ", 3)')).to.be.equal('work work work ');
    });
});
