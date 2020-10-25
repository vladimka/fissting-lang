const Token = require('../lexer/token');
const expressions = require('./ast/expressions/');
const statements = require('./ast/statements/');

class Parser{
	constructor(tokens){
		this.tokens = tokens;
		this.pos = 0;
		this.EOF = new Token('EOF', '');
		this.statement;
	}

	get(pos){
		let offset = this.pos + pos;

		if(offset >= this.tokens.length)
			return this.EOF;

		return this.tokens[offset];
	}

	match(type){
		let res = this.get(0).type == type;

		if(res == true)
			this.pos++;

		return res;
	}

	parse(){
		this.statement = this.blockStatement();
		return this.statement;
	}

	blockStatement(){
		let _statements = [];

		while(!this.match('EOF')){
			_statements.push(this.statement());
		}

		return new statements.BlockStatement(_statements);
	}

	statement(){
		if(this.match('NEW_LINE')) return;
		if(this.match('PUT')){
			let expr = this.expression();
			this.match('IN');
			let name = this.get(0).value;
			this.match('WORD');
			return new statements.PutStatement(expr, name);
		}
		if(this.match('PRINT'))
			return new statements.PrintStatement();
		throw new Error('Unknown statement: ' + this.get(0).type);
	}

	expression(){
		return this.multiplicative();
	}

	multiplicative(){
		let expr = this.additive();

		while(true){
			if(this.match('STAR')){
				expr = new expressions.BinaryExpression('*', expr, this.additive());
				continue;
			}
			if(this.match('SLASH')){
				expr = new expressions.BinaryExpression('/', expr, this.additive());
				continue;
			}
			break;
		}

		return expr;
	}

	additive(){
		let expr = this.primary();

		while(true){
			if(this.match('PLUS')){
				expr = new expressions.BinaryExpression('+', expr, this.primary());
				continue;
			}
			if(this.match('MINUS')){
				expr = new expressions.BinaryExpression('-', expr, this.primary());
				continue;
			}
			break;
		}

		return expr;
	}

	unary(){
		let expr = this.primary();

		while(true){
			if(this.match('MINUS')){
				console.log(expr);
				expr = new expressions.UnaryExpression('-', expr);
				continue;
			}
			break;
		}

		return expr;
	}

	primary(){
		let current = this.get(0);

		if(this.match('NUM'))
			return new expressions.NumberExpression(parseFloat(current.value));

		if(this.match('LBRACE')){
			let expr = this.expression();
			this.match('RBRACE');
			return expr;
		}

		if(this.match('WORD'))
			return new expressions.VariableExpression(current.value);

		throw new Error('Unknown token: ' + current.type);
	}
}

module.exports = Parser;