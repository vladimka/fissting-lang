class BlockStatement{
	constructor(statements){
		this.statements = statements;
	}

	execute(){
		for(let statement of this.statements)
			statement.execute();
	}
}

module.exports = BlockStatement;