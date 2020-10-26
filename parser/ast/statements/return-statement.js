class ReturnStatement{
	constructor(expr){
		this.expr = expr;
	}

	execute(){
		throw this.expr;
	}
}

module.exports = ReturnStatement;