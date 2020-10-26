const { readFileSync } = require('fs');
const Lexer = require('./lexer/');
const Parser = require('./parser/');

class Interpreter{
	constructor(fileName){
		this.lexer = new Lexer(readFileSync(fileName, 'utf8'));
		this.tokens = this.lexer.tokenize();

		// console.log(this.tokens);

		this.parser = new Parser(this.tokens);
		this.program = this.parser.parse();

		// console.log(this.program.statements);
	}

	interpret(){
		try{
			this.program.execute();
		}catch(e){
			console.log(e);
		}
	}
}

module.exports = Interpreter;