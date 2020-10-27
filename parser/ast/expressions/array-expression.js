const { ArrayValue } = require('../../../lib/values/');

class ArrayExpression{
	constructor(value){
		this.value = value;
		this.name = "ArrayExpression";
	}

	eval(){
		return new ArrayValue(this.value);
	}
}

module.exports = ArrayExpression;