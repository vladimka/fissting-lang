class ReturnStatement{
	constructor(expr){
		this.expr = expr;
		this.name = "ReturnStatement";
	}

	execute(){
		throw this.expr;
	}
}

module.exports = ReturnStatement;