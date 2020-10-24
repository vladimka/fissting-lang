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
}

module.exports = NumberValue;