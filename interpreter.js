const { readFileSync } = require('fs');
const Lexer = require('./lexer/');
const Parser = require('./parser/');

class Interpreter{
	constructor(fileName){
		this.lexer = new Lexer(readFileSync(fileName, 'utf8'));
		this.tokens = this.lexer.tokenize();
		this.tokens = this.tokens;
		console.log(this.tokens);
		this.parser = new Parser(this.tokens);
		this.program = this.parser.parse();
		console.log(this.program.statements);
	}

	interpret(){
		this.program.execute();
	}
}

module.exports = Interpreter;