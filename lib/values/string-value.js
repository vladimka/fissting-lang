const UnknownValue = require('./unknown-value');

class StringValue{
	constructor(value){
		this.value = value;
		this.type = 'string';
		this.operations = {
			"+" : value => new StringValue(this.asString() + value.asString())
		}
	}

	asNumber(){
		throw "";
	}

	asString(){
		return this.value;
	}

	asBoolean(){
		return this.value == '' ? false : true;
	}

	count(op, value){
		return this.operations[op](value) || new UnknownValue();
	}
}

module.exports = StringValue;