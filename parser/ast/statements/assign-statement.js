const Variables = require('../../../lib/variables');

class AssignStatement{
	constructor(name, expr){
		this.expr = expr;
		this.name = name;
	}

	execute(){
		Variables.set(this.name, this.expr.eval());
	}
}

module.exports = AssignStatement;