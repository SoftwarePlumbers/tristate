
const STRINGS = ['TRUE','FALSE','UNKNOWN'];

class TriState {
	constructor(tristate_value, boolean_value) {
		this.tristate_value = tristate_value;
		this.boolean_value = boolean_value;
	}

	and(other) {
		return AND[this.tristate_value][other.tristate_value];
	}

	andBoolean(other) {
		return AND[this.tristate_value][TriState.from(other).tristate_value];		
	}

	or(other) {
		return OR[this.tristate_value][other.tristate_value];
	}

	orBoolean(other) {
		return OR[this.tristate_value][TriState.from(other).tristate_value];		
	}

	static from(boolean_value) {
		if (boolean_value === null) return UNKNOWN;
		return boolean_value ? TRUE : FALSE;
	}

	get boolean() {
		return this.boolean_value;
	}

	toString() {
		return STRINGS[this.tristate_value];
	}
}


var FALSE = new TriState(0,false);
var TRUE = new TriState(1,true);
var UNKNOWN = new TriState(2, null);

var AND = [ [FALSE, FALSE, FALSE], [FALSE, TRUE, UNKNOWN], [FALSE, UNKNOWN, UNKNOWN] ];
var OR = [ [FALSE, TRUE, UNKNOWN], [TRUE, TRUE, TRUE], [UNKNOWN, TRUE, UNKNOWN] ];

function and(a,b) {
	return TriState.from(a).andBoolean(b).boolean;
}

function or(a,b) {
	return TriState.from(a).orBoolean(b).boolean;
}


module.exports = { TRUE, FALSE, UNKNOWN, and, or, TriState };