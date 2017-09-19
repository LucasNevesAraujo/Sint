import expect from 'expect.js';
import { Position } from './../../../src/parser';
import {
    CellIdentifier,
} from './../../../src/parser/ast';

describe('CellIdentifier', () =>
{
    let cell;

    describe('clean', () =>
    {
        it('should return clean cell', () =>
        {
            cell = new CellIdentifier('a1');
            expect(cell.clean()).to.be.equal('A1');

            cell = new CellIdentifier('A$1');
            expect(cell.clean()).to.be.equal('A1');

            cell = new CellIdentifier('$a1');
            expect(cell.clean()).to.be.equal('A1');

            cell = new CellIdentifier('$A$1');
            expect(cell.clean()).to.be.equal('A1');

            cell = new CellIdentifier('$A$1', 'SomeSheet');
            expect(cell.clean()).to.be.equal('A1');
        });
    });

    describe('position', () =>
    {
        it('should return correct position of cell', () =>
        {
            cell = new CellIdentifier('A1');
            expect(cell.position()).to.be.eql(new Position(1, 1));

            cell = new CellIdentifier('AA103');
            expect(cell.position()).to.be.eql(new Position(27, 103));
        });
    });

    describe('toDecimal', () =>
    {
        it('should return correct decimal values from letters', () =>
        {
            expect(CellIdentifier.toDecimal('a')).to.be.equal(1);
            expect(CellIdentifier.toDecimal('E')).to.be.equal(5);
            expect(CellIdentifier.toDecimal('AA')).to.be.equal(27);
            expect(CellIdentifier.toDecimal('AZ')).to.be.equal(52);
        });
    });
});
