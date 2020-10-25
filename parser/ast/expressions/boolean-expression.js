const { BooleanValue } = require('../../../lib/values/');

class BooleanExpression{
	constructor(value){
		this.value = value;
	}

	eval(){
		return new BooleanValue(this.value);
	}
}

module.exports = BooleanExpression;