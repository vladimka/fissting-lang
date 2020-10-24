class BlockExpression{
	constructor(expressions){
		this.expressions = expressions.filter(expr => expr != undefined);
	}

	eval(){
		let values = [];

		for(let expr of this.expressions)
			values.push(expr.eval());

		return values;
	}
}

module.exports = BlockExpression;