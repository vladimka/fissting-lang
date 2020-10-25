const { readFileSync } = require('fs');
const Lexer = require('./lexer/');
const Parser = require('./parser/');

class Interpreter{
	constructor(fileName){
		this.lexer = new Lexer(readFileSync(fileName, 'utf8'));
		this.tokens = this.lexer.tokenize();
		this.tokens = this.tokens.filter(token => token.type != 'SPACE');
		this.parser = new Parser(this.tokens);
		this.program = this.parser.parse();
	}

	interpret(){
		console.log(this.tokens);
		console.log(this.program);
		this.program.execute();
	}
}

module.exports = Interpreter;