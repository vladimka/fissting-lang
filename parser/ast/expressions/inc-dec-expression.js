const { NumberValue } = require('../../../lib/values/');

class IncDecExpression{
	constructor(op, expr){
		this.op = op;
		this.expr = expr;
		this.name = 'IncDecExpression';
	}

	eval(){
		let value = this.expr.eval();
		let result;

		switch(this.op){
			case '++': result = new NumberValue(value.asNumber() + 1); break;
			case '--': result = new NumberValue(value.asNumber() - 1); break;
		}

		return result;
	}
}

module.exports = IncDecExpression;