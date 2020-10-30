const Variables = require('../../../lib/variables');

class FunctionExpression{
	constructor(fnName, args){
		this.fnName = fnName;
		this.args = args;
		this.name = "FunctionExpression";
	}

	eval(){
		try{
			let fn = Variables.get(this.fnName);
			return fn.value(this.args);
		}catch{
			throw new Error('Error in function: ' + this.fnName);
		}
	}
}

module.exports = FunctionExpression;