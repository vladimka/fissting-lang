const Variables = require('../../../lib/variables');

class ArrayAccessExpression{
	constructor(name, indices){
		this.name = name;
		this.indices = indices;
	}

	eval(){
		let val = Variables.get(this.name);

		for(let index of this.indices){
			val = val.get(index.eval().asNumber()).eval();
		}

		return val;
	}
}

module.exports = ArrayAccessExpression;