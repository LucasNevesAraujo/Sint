import expect from 'expect.js';
import { Range, Position } from '../../src/parser';

describe('Range', () =>
{
    describe('correct', () =>
    {
        let range;

        it('should return correct range', () =>
        {
            const A1Position = new Position(1, 1);
            const A3Position = new Position(1, 3);
            const B3Position = new Position(2, 3);
            const B1Position = new Position(2, 1);

            range = new Range(A1Position, B3Position);
            expect(range.correct()).to.be.eql(
                new Range(new Position(1, 1), new Position(2, 3))
            );

            range = new Range(B3Position, A1Position);
            expect(range.correct()).to.be.eql(
                new Range(new Position(1, 1), new Position(2, 3))
            );

            range = new Range(A3Position, B1Position);
            expect(range.correct()).to.be.eql(
                new Range(new Position(1, 1), new Position(2, 3))
            );
        });
    });
});
