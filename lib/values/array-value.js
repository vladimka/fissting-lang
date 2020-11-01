const UnknownValue = require('./unknown-value');

class ArrayValue{
	constructor(value){
		this.value = value;
		this.type = 'array';

		for(let i = 0; i < this.value.length; i++)
			this.value[i] = this.value[i].eval();

		this.operations = {}
	}

	asString(){
		let str = '[';

		for(let i = 0; i < this.value.length; i++){
			let value = this.value[i];

			str += value.asString();
			
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

	count(op, value){
		return this.operations[op](value) || new UnknownValue();
	}

	push(value){
		this.value.push(value);
	}

	pop(value){
		return this.value.pop();
	}
}

module.exports = ArrayValue;