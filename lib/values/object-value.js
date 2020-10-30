const UnknownValue = require('./unknown-value');

class ObjectValue{
	constructor(value){
		this.value = value;
		this.type = 'object';

		let keys = Object.keys(this.value);
		for(let i = 0; i < keys.length; i++)
			this.value[keys[i]] = this.value[keys[i]].eval();

		this.operations = {}
	}

	asString(){
		let str = '{';

		let keys = Object.keys(this.value);
		for(let i = 0; i < keys.length; i++){
			let value = this.value[keys[i]];

			str += `${keys[i]} : ${value.asString()}`;
			
			if(i < keys.length - 1)
				str += ', ';
		}


		return str + '}';
	}

	asNumber(){
		throw new Error("Can not cast \"object\" to \"number\"");
	}

	asBoolean(){
		return this.value != {};
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
}

module.exports = ObjectValue;