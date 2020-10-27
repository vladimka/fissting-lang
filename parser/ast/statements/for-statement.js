class ForStatement{
	constructor(assign, condition, incr, body){
		this.assign = assign;
		this.condition = condition;
		this.incr = incr;
		this.body = body;
		this.name = "ForStatement";
	}

	execute(){
		for(this.assign.execute(); this.condition.eval().asBoolean() == true; this.incr.execute()){
			try{
				this.body.execute();
			}catch(e){
				if(e == "break") break;
				else if(e == "continue") continue;
			}
		}
	}
}

module.exports = ForStatement;