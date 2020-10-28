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
		let result;

		if(value1.type == "string"){
			switch(this.op){
				case '+': result = new StringValue(value1.asString() + value2.asString()); break;
			}
			
			return result;
		}

		switch(this.op){
			case '+': result = new NumberValue(value1.asNumber() + value2.asNumber()); break;
			case '-': result = new NumberValue(value1.asNumber() - value2.asNumber()); break;
			case '/':
				if(value2.asNumber() == 0){
					result = new UnknownValue();
					break;
				}
				result = new NumberValue(value1.asNumber() / value2.asNumber());
			break;
			case '*': result = new NumberValue(value1.asNumber() * value2.asNumber()); break;
			case '%': result = new NumberValue(value1.asNumber() % value2.asNumber()); break;
		}
		
		return result;
	}
}

module.exports = BinaryExpression;