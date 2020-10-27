class BreakStatement{
	constructor(){
		this.name = "BreakStatement";
	}

	execute(){
		throw "break";
	}
}

module.exports = BreakStatement;