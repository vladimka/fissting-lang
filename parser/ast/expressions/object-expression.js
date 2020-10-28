const { ObjectValue } = require('../../../lib/values/');

class ObjectExpression{
	constructor(value){
		this.value = value;
		this.name = "ObjectExpression";
	}

	eval(){
		return new ObjectValue(this.value);
	}
}

module.exports = ObjectExpression;