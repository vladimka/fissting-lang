const Variables = require('../../../lib/variables');

class VariableExpression{
	constructor(name){
		this.name = name;
	}

	eval(){
		return Variables.get(this.name);
	}
}

module.exports = VariableExpression;