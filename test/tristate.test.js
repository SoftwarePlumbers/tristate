const { and, or, TRUE, FALSE, UNKNOWN, TriState } = require( '../src/tristate');
const expect = require('chai').expect;
const debug = require('debug')('tristate~tests');

const BOOLEANS = [ { a: FALSE, b: FALSE }, { a: FALSE, b: TRUE }, { a: TRUE, b: FALSE }, { a: TRUE, b: TRUE } ]
const UNKNOWNS = [ 
	{ a: UNKNOWN, b: TRUE, and_result: UNKNOWN, or_result: TRUE }, 
	{ a: UNKNOWN, b: FALSE, and_result: FALSE, or_result: UNKNOWN }, 
	{ a: TRUE, b: UNKNOWN, and_result: UNKNOWN, or_result: TRUE }, 
	{ a: FALSE, b: UNKNOWN, and_result: FALSE, or_result: UNKNOWN }, 
	{ a: UNKNOWN, b: UNKNOWN, and_result: UNKNOWN, or_result: UNKNOWN } 
];

describe('tristate logic', () => {

	it('TRUE.boolean === true', () => {
		expect(TRUE.boolean).to.equal(true);
	});

	it('FALSE.boolean === false', () => {
		expect(FALSE.boolean).to.equal(false);
	});

	it('UNKNOWN.boolean === null', () => {
		expect(UNKNOWN.boolean).to.be.null;
	});

	it('behaves same as boolean logic for TRUE, FALSE', ()=> {
		for ({a,b} of BOOLEANS) {
			debug(a,b);
			expect(a.and(b).boolean).to.equal(a.boolean && b.boolean);
			expect(a.or(b).boolean).to.equal(a.boolean || b.boolean);
			expect(and(a.boolean,b.boolean)).to.equal(a.boolean && b.boolean);
			expect(or(a.boolean,b.boolean)).to.equal(a.boolean || b.boolean);
		}
	});

	it('has correct behavior for unknowns', ()=> {
		for ({a,b,and_result,or_result} of UNKNOWNS) {
			debug(a,b);
			expect(a.and(b)).to.equal(and_result);
			expect(a.or(b)).to.equal(or_result);
		}
	});

	it('prints truth table for README', () => {
		console.log('|a\t\t|b\t\t|a && b\t|and(a,b)\t|')
		for ({a,b} of [ ...BOOLEANS, ...UNKNOWNS]) {
			console.log(`|${a.boolean}\t|${b.boolean}\t|${a.boolean && b.boolean}\t|${a.and(b).boolean}\t|`)
		}

		console.log('\n|a\t\t|b\t\t|a || b\t|or(a,b)\t|')
		for ({a,b} of [ ...BOOLEANS, ...UNKNOWNS]) {
			console.log(`|${a.boolean}\t|${b.boolean}\t|${a.boolean || b.boolean}\t|${a.or(b).boolean}\t|`)
		}

		console.log('\n|a\t\t|b\t\t|a.and(b)\t|')
		for ({a,b} of [ ...BOOLEANS, ...UNKNOWNS]) {
			console.log(`|${a}\t|${b}\t|${a.and(b)}\t|`)
		}

		console.log('\n|a\t\t|b\t\t|a.or(b)\t|')
		for ({a,b} of [ ...BOOLEANS, ...UNKNOWNS]) {
			console.log(`|${a}\t|${b}\t|${a.or(b)}\t|`)
		}
	});
});
