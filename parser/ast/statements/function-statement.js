const Variables = require('../../../lib/variables');

class FunctionStatement{
	constructor(name, args){
		this.name = name;
		this.args = args;
	}

	execute(){
		let fn = Variables.get(this.name);
		fn.value(this.args);
	}
}

module.exports = FunctionStatement;