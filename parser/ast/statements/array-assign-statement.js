const Variables = require('../../../lib/variables');

class ArrayAssignStatement{
	constructor(arrName, indices, valueExpr){
		this.arrName = arrName;
		this.indices = indices;
		this.valueExpr = valueExpr;
		this.name = "ArrayAssignStatement";
	}

	execute(){
		let value = this.valueExpr.eval();

		let arrValue = Variables.get(this.arrName);

		for(let index of this.indices.splice(this.indices.length - 1, 1)){
			index = index.eval().asNumber();
			arrValue = arrValue.get(index);
		}

		arrValue.set(this.indices[this.indices.length-1].eval().asNumber(), value);
	}
}

module.exports = ArrayAssignStatement;