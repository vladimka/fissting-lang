const Variables = require('../../../lib/variables');

class ObjectAssignStatement{
	constructor(objName, keys, valueExpr){
		this.objName = objName;
		this.keys = keys;
		this.valueExpr = valueExpr;
		this.name = "ObjectAssignStatement";
		this.keys.splice(this.keys.length - 1, 1);
	}

	execute(){
		let value = this.valueExpr.eval();

		let objValue = Variables.get(this.objName);

		for(let index of this.keys.splice(this.keys.length - 1, 1)){
			objValue = objValue.get(index);
		}

		objValue.set(this.keys[this.keys.length-1], value);
	}
}

module.exports = ObjectAssignStatement;