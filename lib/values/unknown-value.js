class UnknownValue{
	constructor(){
		this.type = 'unknown';
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
}

module.exports = UnknownValue;