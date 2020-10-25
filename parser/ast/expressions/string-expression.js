const { StringValue } = require('../../../lib/values/');

class StringExpression{
	constructor(value){
		this.value = value;
	}

	eval(){
		return new StringValue(this.value);
	}
}

module.exports = StringExpression;