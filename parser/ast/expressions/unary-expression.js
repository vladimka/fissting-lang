const { NumberValue } = require('../../../lib/values/');

class UnaryExpression{
	constructor(op, expr){
		this.op = op;
		this.expr = expr;
		this.name = "UnaryExpression";
	}

	eval(){
		let value = this.expr.eval();
		let res;

		switch(this.op){
			case "-": res = new NumberValue(-(value.asNumber())); break;
			default:
				case "+": res = new NumberValue(value.asNumber()); break;
		}

		return res;
	}
}

module.exports = UnaryExpression;