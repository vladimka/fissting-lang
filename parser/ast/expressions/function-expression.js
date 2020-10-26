const Variables = require('../../../lib/variables');

class FunctionExpression{
	constructor(name, args){
		this.name = name;
		this.args = args;
	}

	eval(){
		let fn = Variables.get(this.name);
		return fn.value(this.args);
	}
}

module.exports = FunctionExpression;