class WhileStatement{
	constructor(condition, body){
		this.condition = condition;
		this.body = body;
	}

	execute(){
		while(this.condition.eval().asBoolean() == true){
			this.body.execute();
		}
	}
}

module.exports = WhileStatement;