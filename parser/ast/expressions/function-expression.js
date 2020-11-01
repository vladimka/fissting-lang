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
		}catch(e){
			console.log(`Error while executing function "${this.fnName}"\n${e}`);
		}
	}
}

module.exports = FunctionExpression;