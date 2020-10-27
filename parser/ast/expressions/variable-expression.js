const Variables = require('../../../lib/variables');

class VariableExpression{
	constructor(varName){
		this.varName = varName;
		this.name = "VariableExpression";
	}

	eval(){
		return Variables.get(this.varName);
	}
}

module.exports = VariableExpression;