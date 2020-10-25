class BooleanValue{
	constructor(value){
		this.value = value;
		this.type = 'boolean';
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
}

module.exports = BooleanValue;