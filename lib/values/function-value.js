class FunctionValue{
	constructor(value){
		this.value = value;
		this.type = 'function';
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
}

module.exports = FunctionValue;