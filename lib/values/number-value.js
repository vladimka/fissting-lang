class NumberValue{
	constructor(value){
		this.value = value;
		this.type = 'number';
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
}

module.exports = NumberValue;