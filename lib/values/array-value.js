class ArrayValue{
	constructor(value){
		this.value = value;
		this.type = 'array';
	}

	asString(){
		let str = '[';

		for(let i = 0; i < this.value.length; i++){
			let expr = this.value[i];

			str += expr.eval().asString();
			
			if(i < this.value.length - 1)
				str += ', ';
		}


		return str + ']';
	}

	asNumber(){
		throw new Error("Can not cast \"array\" to \"number\"");
	}

	asBoolean(){
		return this.value != [];
	}

	get(index){
		return this.value[index];
	}

	set(index, value){
		this.value[index] = value;
	}
}

module.exports = ArrayValue;