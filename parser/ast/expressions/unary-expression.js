const { NumberValue } = require('../../../lib/values/');

class UnaryExpression{
	constructor(op, expr){
		this.op = op;
		this.expr = expr;
	}

	eval(){
		let value = this.expr.eval();
		let res;

		switch(this.op){
			case "-": result = new NumberValue(-(value.asNumber())); break;
			case "+": result = new NumberValue(value.asNumber()); break;
		}
		console.log(res, value);

		return res;
	}
}

module.exports = UnaryExpression;