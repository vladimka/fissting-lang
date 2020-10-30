const Variables = require('../../../lib/variables');
const { NumberValue } = require('../../../lib/values/');

class AssignStatement{
	constructor(op, varName, expr){
		this.expr = expr;
		this.varName = varName;
		this.op = op;
		this.name = "AssignStatement";
	}

	execute(){
		let variable = Variables.get(this.varName);
		let value = this.expr.eval();
		let result;

		if(variable.type == 'string' || value.type == 'string'){
			switch(this.op){
				case '+=': result = new NumberValue(variable.asString() + value.asString()); break;
				case '=':
				default:
					result = value;
			}
		}else{
			switch(this.op){
				case '+=': result = new NumberValue(variable.asNumber() + value.asNumber()); break;
				case '-=': result = new NumberValue(variable.asNumber() - value.asNumber()); break;
				case '*=': result = new NumberValue(variable.asNumber() * value.asNumber()); break;
				case '/=': result = new NumberValue(variable.asNumber() / value.asNumber()); break;
				case '=':
				default:
					result = value;
			}
		}

		Variables.set(this.varName, result);
	}
}

module.exports = AssignStatement;