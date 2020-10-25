class WhileStatement{
	constructor(condition, body){
		this.condition = condition;
		this.body = body;
	}

	execute(){
		while(this.condition.eval().asBoolean() == true){
			try{
				this.body.execute();
			}catch(e){
				if(e == "break") break;
			}
		}
	}
}

module.exports = WhileStatement;