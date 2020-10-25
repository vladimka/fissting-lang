class StringValue{
	constructor(value){
		this.value = value;
		this.type = 'string';
	}

	asNumber(){
		throw new Error('Can not cast "string" to "number"');
	}

	asString(){
		return this.value;
	}

	asBoolean(){
		return this.value == '' ? false : true;
	}
}

module.exports = StringValue;