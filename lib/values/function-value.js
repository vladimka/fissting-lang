const UnknownValue = require('./unknown-value');

class FunctionValue{
	constructor(value){
		this.value = value;
		this.type = 'function';
		this.operations = {}
	}

	asNumber(){
		throw new Error("Can not cast 'function' to 'number'");
	}

	asString(){
		throw new Error("Can not cast 'function' to 'string'");
	}

	asBoolean(){
		throw new Error("Can not cast 'function' to 'boolean'");
	}

	count(op, value){
		return this.operations[op](value) || new UnknownValue();
	}
}

module.exports = FunctionValue;