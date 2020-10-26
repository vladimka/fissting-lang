const { ArrayValue } = require('../../../lib/values/');

class ArrayExpression{
	constructor(value){
		this.value = value;
	}

	eval(){
		return new ArrayValue(this.value);
	}
}

module.exports = ArrayExpression;