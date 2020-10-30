const { NumberValue, UnknownValue, StringValue } = require('../../../lib/values/');

class BinaryExpression{
	constructor(op, expr1, expr2){
		this.op = op;
		this.expr1 = expr1;
		this.expr2 = expr2;
		this.name = "BinaryExpression";
	}

	eval(){
		let value1 = this.expr1.eval();
		let value2 = this.expr2.eval();
		
		return value1.count(this.op, value2);
	}
}

module.exports = BinaryExpression;