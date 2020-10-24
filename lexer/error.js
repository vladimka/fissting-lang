class LexerError{
	constructor(column, line, symbol){
		this.column = column;
		this.line = line;
		this.symbol = symbol;
	}

	throw(){
		console.log(`LexerError: unknown symbol '${this.symbol}' at line ${this.line}, column ${this.column}`);
		process.exit(-1);
	}
}

module.exports = LexerError;