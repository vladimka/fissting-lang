class WhileStatement{
	constructor(condition, body){
		this.condition = condition;
		this.body = body;
		this.name = "WhileStatement";
	}

	execute(){
		while(this.condition.eval().asBoolean() == true){
			try{
				this.body.execute();
			}catch(e){
				if(e == "break") break;
				else if(e == "continue") continue;
			}
		}
	}
}

module.exports = WhileStatement;