const UnknownValue = require('./unknown-value');

class NumberValue{
	constructor(value){
		this.value = value;
		this.type = 'number';
		this.operations = {
			"+" : value => new NumberValue(this.asNumber() + value.asNumber()),
			"-" : value => new NumberValue(this.asNumber() - value.asNumber()),
			"*" : value => new NumberValue(this.asNumber() * value.asNumber()),
			"/" : value => new NumberValue(this.asNumber() / value.asNumber()),
			"%" : value => new NumberValue(this.asNumber() % value.asNumber()),
		}
	}

	asNumber(){
		return this.value;
	}

	asString(){
		return this.value.toString();
	}

	asBoolean(){
		return this.value == 0 ? false : true;
	}

	count(op, value){
		return this.operations[op](value) || new UnknownValue();
	}
}

module.exports = NumberValue;