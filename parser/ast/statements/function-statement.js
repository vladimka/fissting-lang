const Variables = require('../../../lib/variables');

class FunctionStatement{
	constructor(fnName, args){
		this.fnName = fnName;
		this.args = args;
		this.name = "FunctionStatement";
	}

	execute(){
		let fn = Variables.get(this.fnName);
		fn.value(this.args);
	}
}

module.exports = FunctionStatement;