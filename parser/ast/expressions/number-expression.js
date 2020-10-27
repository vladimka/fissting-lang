const { NumberValue } = require('../../../lib/values/');

class NumberExpression{
	constructor(value){
		this.value = value;
		this.name = "NumberExpression";
	}

	eval(){
		return new NumberValue(parseFloat(this.value));
	}
}

module.exports = NumberExpression;