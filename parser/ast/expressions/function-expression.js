const Variables = require('../../../lib/variables');

class FunctionExpression{
	constructor(fnName, args){
		this.fnName = fnName;
		this.args = args;
		this.name = "FunctionExpression";
	}

	eval(){
		let fn = Variables.get(this.fnName);
		return fn.value(this.args);
	}
}

module.exports = FunctionExpression;