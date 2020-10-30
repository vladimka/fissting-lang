const UnknownValue = require('./unknown-value');

class BooleanValue{
	constructor(value){
		this.value = value;
		this.type = 'boolean';
		this.operations = {}
	}

	asNumber(){
		return this.value == true ? 1 : 0;
	}

	asString(){
		return this.value.toString();
	}

	asBoolean(){
		return this.value;
	}

	count(op, value){
		return this.operations[op](value) || new UnknownValue();
	}
}

module.exports = BooleanValue;