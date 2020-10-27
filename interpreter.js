const { readFileSync, writeFileSync } = require('fs');
const path = require('path');
const Lexer = require('./lexer/');
const Parser = require('./parser/');

class Interpreter{
	constructor(fileName){
		this.lexer = new Lexer(readFileSync(fileName, 'utf8'));
		this.tokens = this.lexer.tokenize();

		// console.log(this.tokens);

		this.parser = new Parser(this.tokens);
		this.program = this.parser.parse();

		console.log(this.program);
		writeFileSync(path.join(__dirname, '/ast.json'), JSON.stringify(this.program, null, '\t'), 'utf8');
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