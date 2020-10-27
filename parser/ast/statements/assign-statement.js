const Variables = require('../../../lib/variables');

class AssignStatement{
	constructor(varName, expr){
		this.expr = expr;
		this.varName = varName;
		this.name = "AssignStatement";
	}

	execute(){
		Variables.set(this.varName, this.expr.eval());
	}
}

module.exports = AssignStatement;