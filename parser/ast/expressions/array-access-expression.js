const Variables = require('../../../lib/variables');

class ArrayAccessExpression{
	constructor(arrName, indices){
		this.arrName = arrName;
		this.indices = indices;
		this.name = "ArrayAccessExpression";
	}

	eval(){
		let val = Variables.get(this.arrName);

		for(let index of this.indices){
			val = val.get(index.eval().asNumber());
		}

		return val;
	}
}

module.exports = ArrayAccessExpression;