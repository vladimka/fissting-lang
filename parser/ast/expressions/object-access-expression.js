const Variables = require('../../../lib/variables');

class ObjectAccessExpression{
	constructor(objName, keys){
		this.objName = objName;
		this.keys = keys;
		this.name = "ObjectAccessExpression";
	}

	eval(){
		let val = Variables.get(this.objName);

		for(let index of this.keys){
			val = val.get(index);
		}

		return val;
	}
}

module.exports = ObjectAccessExpression;