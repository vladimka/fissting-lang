class BlockStatement{
	constructor(statements){
		this.statements = statements;
		this.name = "BlockStatement";
	}

	execute(){
		for(let statement of this.statements)
			statement.execute();
	}
}

module.exports = BlockStatement;