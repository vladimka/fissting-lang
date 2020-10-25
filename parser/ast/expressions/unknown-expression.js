const { UnknownValue } = require('../../../lib/values/');

class UnknownExpression{
	eval(){
		return new UnknownValue();
	}
}

module.exports = UnknownExpression;