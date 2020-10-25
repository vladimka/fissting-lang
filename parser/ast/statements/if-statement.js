class IfStatement{
	constructor(condition, body, elseBlock){
		this.condition = condition;
		this.body = body;
		this.elseBlock = elseBlock;
	}

	execute(){
		if(this.condition.eval().asBoolean() == true) this.body.execute();
		else{
			if(this.elseBlock == undefined)
				return;

			this.elseBlock.execute();
		}
	}
}

module.exports = IfStatement;