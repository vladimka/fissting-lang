const { BooleanValue } = require('../../../lib/values/');

class ConditionalExpression{
	constructor(op, expr1, expr2){
		this.op = op;
		this.expr1 = expr1;
		this.expr2 = expr2;
		this.name = "ConditionalExpression";
	}

	eval(){
		let value1 = this.expr1.eval();
		let value2 = this.expr2.eval();
		let res;

		switch(this.op){
			case '<': res = value1.asNumber() < value2.asNumber(); break;
			case '>': res = value1.asNumber() > value2.asNumber(); break;
			case '<=': res = value1.asNumber() <= value2.asNumber(); break;
			case '>=': res = value1.asNumber() >= value2.asNumber(); break;
			case '==': res = value1.asNumber() == value2.asNumber(); break;
			case '!=': res = value1.asBoolean() != value2.asBoolean(); break;
			case '||': res = value1.asBoolean() || value2.asBoolean(); break;
			case '&&': res = value1.asBoolean() && value2.asBoolean(); break;
		}

		return new BooleanValue(res);
	}
}

module.exports = ConditionalExpression;