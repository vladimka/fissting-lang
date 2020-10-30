const { readFileSync, writeFileSync } = require('fs');
const path = require('path');
const Lexer = require('./lexer/');
const Parser = require('./parser/');

class Interpreter{
	constructor(fileName){
		this.lexer = new Lexer(readFileSync(fileName, 'utf8'));
		this.tokens = this.lexer.tokenize();
		this.parser = new Parser(this.tokens);
		this.program = this.parser.parse();
	}

	interpret(args){
		try{
			if(args.tokens == true){
				console.log(this.tokens);
			}

			if(args.ast == true){
				console.log(this.program);
				writeFileSync(path.join(__dirname, '/ast.json'), JSON.stringify(this.program, null, '\t'), 'utf8');
			}

			let start = Date.now();
			this.program.execute();
			console.log(`Execution time: ${Date.now()-start}ms`);
		}catch(e){
			console.log(e);
		}
	}
}

module.exports = Interpreter;