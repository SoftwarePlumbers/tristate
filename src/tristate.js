
/** String representations o Tri-state logic values (TRUE,FALSE,UNKNOWN) */
const STRINGS = ['TRUE','FALSE','UNKNOWN'];

/** Class representing a value in Tri-state logic (TRUE,FALSE,UNKNOWN)
*/
class TriState {

	/** Constructor
	* 
	* Do not use; the constant values TRUE, FALSE, UNKOWN or the static method 'from' should be
	* used instead.
	*
	* @param tristate_value {number} - 0,1,2 
	* @param boolean_value {boolean} boolean equivalent of tri-state value
	*/ 
	constructor(tristate_value, boolean_value) {
		this.tristate_value = tristate_value;
		this.boolean_value = boolean_value;
	}

	/** Tri-state and function
	*
	* | this	| other	  | AND     |
	* |---------|---------|---------|
	* | TRUE    | TRUE    | TRUE	|
	* | TRUE    | FALSE   | FALSE	|
	* | FALSE   | TRUE    | FALSE	|
	* | FALSE   | FALSE   | FALSE	|
	* | UNKNOWN | FALSE   | FALSE   |
	* | UNKNOWN | TRUE    | UNKNOWN |
	* | FALSE   | UNKNOWN | FALSE   |
	* | TRUE    | UNKNOWN | UNKNOWN	|
	* | UNKNOWN | UNKNOWN | UNKNOWN |
	*
	* @param other {TriState} - tri-state value
	* @returns {TriState} - TRUE, FALSE, or UNKNOWN per truth table
	*/
	and(other) {
		return AND[this.tristate_value][other.tristate_value];
	}

	/** Convenience and function
	*
	* equivalent to `this.and(TriState.from(other))`
	*
	* @param other {Boolean} value for and
	* @return {TriState} - TRUE, FALSE, or UNKNOWN
	*/
	andBoolean(other) {
		return AND[this.tristate_value][TriState.from(other).tristate_value];		
	}

	/** Tri-state or function
	*
	* | this	| other	  | OR     |
	* |---------|---------|---------|
	* | TRUE    | TRUE    | TRUE	|
	* | TRUE    | FALSE   | TRUE	|
	* | FALSE   | TRUE    | TRUE	|
	* | FALSE   | FALSE   | FALSE	|
	* | UNKNOWN | FALSE   | UNKNOWN |
	* | UNKNOWN | TRUE    | TRUE	|
	* | FALSE   | UNKNOWN | UNKNOWN |
	* | TRUE    | UNKNOWN | TRUE	|
	* | UNKNOWN | UNKNOWN | UNKNOWN |
	*
	* @param other {TriState} - tri-state value
	* @returns {TriState} - TRUE, FALSE, or UNKNOWN per truth table
	*/
	or(other) {
		return OR[this.tristate_value][other.tristate_value];
	}

	/** Convenience or function
	*
	* equivalent to `this.or(TriState.from(other))`
	*
	* @param other {Boolean} value for or
	* @return {TriState} - TRUE, FALSE, or UNKNOWN
	*/
	orBoolean(other) {
		return OR[this.tristate_value][TriState.from(other).tristate_value];		
	}

	/** Convert boolean value to tri-state value
	*
	* | value | result |
	* |-------|--------|
	* | true  | TRUE   |
	* | false | FALSE  |
	* | null  | UNKNOWN |
	*
	* @param value {Boolean} - value to convet
	* @returns {TriState} result per table
	*/
	static from(value) {
		if (value === null) return UNKNOWN;
		return value ? TRUE : FALSE;
	}

	/** Convert tri-state value to boolean
	*
	* | result| this  |
	* |-------|--------|
	* | true  | TRUE   |
	* | false | FALSE  |
	* | null  | UNKNOWN |
	*
	* @returns {Boolean} result per table
	*/
	get boolean() {
		return this.boolean_value;
	}

	/** String representation (TRUE, FALSE, UNKNOWN)
	*/
	toString() {
		return STRINGS[this.tristate_value];
	}
}

/** Tri-state value corresponding to boolean false */
var FALSE = new TriState(0,false);
/** Tri-state value corresponding to boolean true */
var TRUE = new TriState(1,true);
/** Tri-state value corresponding to boolean null */
var UNKNOWN = new TriState(2, null);

/** Lookup table for AND function 
* @private
*/
var AND = [ [FALSE, FALSE, FALSE], [FALSE, TRUE, UNKNOWN], [FALSE, UNKNOWN, UNKNOWN] ];

/** Lookup table for OR function 
* @private
*/
var OR = [ [FALSE, TRUE, UNKNOWN], [TRUE, TRUE, TRUE], [UNKNOWN, TRUE, UNKNOWN] ];

/** tri-state AND operation
*
*  | a     | b     | a && b | AND 	|
*  |-------|-------|--------|-------|
*  | false | false | false  | false |
*  | false | true  | false  | false |
*  | true  | false | false  | false |
*  | true  | true  | true   | true  |
*  | null  | true  | null   | null  |
*  | null  | false | _null_ |_false_|
*  | true  | null  | null   | null  |
*  | false | null  | false  | false |
*  | null  | null  | null   | null  |
* 
* @param a {boolean}
* @param b {boolean}
* @returns {boolean} AND(a,b) as defined in the table.
*/
function and(a,b) {
	return TriState.from(a).andBoolean(b).boolean;
}

/** tri-state OR operation
*
* | a     | b     | js or | OR    |
* |-------|-------|-------|-------|
* | false | false | false | false |
* | false | true  | true  | true  |
* | true  | false | true  | true  |
* | true  | true  | true  | true  |
* | null  | true  | true  | true  |
* | null  | false |_false_|_null_ |
* | true  | null  | true  | true  |
* | false | null  | null  | null  |
* | null  | null  | null  | null  |
* 
* @param a {boolean}
* @param b {boolean}
* @returns {boolean} OR(a,b) as defined in the table.
*/
function or(a,b) {
	return TriState.from(a).orBoolean(b).boolean;
}


module.exports = { TRUE, FALSE, UNKNOWN, and, or, TriState };