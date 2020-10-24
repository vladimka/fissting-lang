const { readFileSync } = require('fs');
const Lexer = require('./lexer/');
const Parser = require('./parser/');

class Interpreter{
	constructor(fileName){
		this.lexer = new Lexer(readFileSync(fileName, 'utf8'));
		this.tokens = this.lexer.tokenize();
		this.tokens = this.tokens.filter(token => token.type != 'SPACE');
		this.parser = new Parser(this.tokens);
		this.expressions = this.parser.parse();
	}

	interpret(){
		console.log(this.tokens);
		console.log(this.expressions);
		for(let expr of this.expressions)
			console.log(expr.eval());
	}
}

module.exports = Interpreter;