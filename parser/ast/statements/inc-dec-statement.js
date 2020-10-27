const Variables = require('../../../lib/variables');
const { NumberValue } = require('../../../lib/values/');

class IncDecStatement{
	constructor(op, varName){
		this.op = op;
		this.varName = varName;
		this.name = 'IncDecStatement';
	}

	execute(){
		let value = Variables.get(this.varName).asNumber();

		switch(this.op){
			case '++': Variables.set(this.varName, new NumberValue(value + 1)); break;
			case '--': Variables.set(this.varName, new NumberValue(value - 1)); break;
		}
	}
}

module.exports = IncDecStatement;