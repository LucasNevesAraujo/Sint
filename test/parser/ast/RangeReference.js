import expect from 'expect.js';
import { TOKENS } from './../../../src/Constants';
import { Token, Range } from './../../../src/parser';
import {
    RangeReference,
    CellIdentifier,
} from './../../../src/parser/ast';

describe('RangeReference', () =>
{
    let range;

    function getRange(value)
    {
        const token = new Token(TOKENS.RANGE, value);
        const ref = new RangeReference(token);

        return ref.range();
    }

    describe('pair', () =>
    {
        it('should return correct pair', () =>
        {
            const token = new Token(TOKENS.RANGE, 'A1:B3');
            const ref = new RangeReference(token);
            const pair = ref.pair();

            expect(pair).to.be.eql([
                new CellIdentifier('A1'),
                new CellIdentifier('B3'),
            ]);
        });
    });

    describe('range', () =>
    {
        it('should return correct range object', () =>
        {
            range = getRange('A1:B3');
            expect(range).to.be.eql(
                new Range(
                    (new CellIdentifier('A1')).position(),
                    (new CellIdentifier('B3')).position()
                )
            );

            range = getRange('B1:A3');
            expect(range).to.be.eql(
                new Range(
                    (new CellIdentifier('B1')).position(),
                    (new CellIdentifier('A3')).position()
                )
            );
        });
    });
});
