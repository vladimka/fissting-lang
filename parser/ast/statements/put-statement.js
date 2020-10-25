const Variables = require('../../../lib/variables');

class PutStatement{
	constructor(expr, name){
		this.expr = expr;
		this.name = name;
	}

	execute(){
		Variables.set(this.name, this.expr.eval());
	}
}

module.exports = PutStatement;