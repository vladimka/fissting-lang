const { UnknownValue } = require('../../../lib/values/');

class UnknownExpression{
	constructor(){
		this.name = "UnknownExpression";
	}

	eval(){
		return new UnknownValue();
	}
}

module.exports = UnknownExpression;