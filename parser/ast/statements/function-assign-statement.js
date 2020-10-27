const Variables = require('../../../lib/variables');
const { FunctionValue, UnknownValue } = require('../../../lib/values/');

class FunctionAssignStatement{
	constructor(fnName, argsList, body){
		this.fnName = fnName;
		this.argsList = argsList;
		this.body = body;
		this.name = "FunctionAssignStatement";
	}

	execute(){
		Variables.set(this.fnName, new FunctionValue(args => {
			let result = new UnknownValue();

			for(let i = 0; i < args.length; i++)
				if(this.argsList[i])
					Variables.set(this.argsList[i], args[i].eval());

			try{
				this.body.execute();
			}catch(e){
				result = e.eval();
			}

			for(let arg of this.argsList)
				Variables.set(arg, new UnknownValue());

			return result;
		}));
	}
}

module.exports = FunctionAssignStatement;