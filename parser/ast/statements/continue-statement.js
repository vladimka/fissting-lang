class ContinueStatement{
	constructor(){
		this.name = "ContinueStatement";
	}

	execute(){
		throw "continue";
	}
}

module.exports = ContinueStatement;