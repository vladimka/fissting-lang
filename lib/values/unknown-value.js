class UnknownValue{
	constructor(){
		this.type = 'unknown';
		this.operations = {}
	}

	asNumber(){
		return 0;
	}

	asString(){
		return 'unknown';
	}

	asBoolean(){
		return false;
	}

	count(op, value){
		return this.operations[op](value) || new UnknownValue();
	}
}

module.exports = UnknownValue;