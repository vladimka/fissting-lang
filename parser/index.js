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

	blockOrStatement(){
		if(this.match('LBRACKET')){
			let _statements = [];

			while(!this.match('RBRACKET')){
				_statements.push(this.statement());
			}
			
			return new statements.BlockStatement(_statements);
		}
		return this.statement();
	}

	blockStatement(){
		let _statements = [];

		while(!this.match('EOF')){
			_statements.push(this.statement());
		}

		return new statements.BlockStatement(_statements);
	}

	statement(){
		if(this.match('IF')) return this.ifStatement();
		else if(this.match('WHILE')) return this.whileStatement();
		else if(this.match('BREAK')) return new statements.BreakStatement();
		else if(this.match('FOR')) return this.forStatement();
		else if(this.match('CONTINUE')) return new statements.ContinueStatement();
		else if(this.match('CALL')) return this.callStatement();
		else if(this.match('FUNCTION')) return this.functionAssignStatement();
		else if(this.match('RETURN')) return new statements.ReturnStatement(this.expression());
		else return this.assignStatement();
	}

	functionAssignStatement(){
		let name = this.get(0).value;
		let args = [];

		this.match('WORD');
		this.match('LPAREN');

		while(!this.match('RPAREN')){
			args.push(this.get(0).value);
			this.match('WORD');
			this.match('COMMA');
		}

		return new statements.FunctionAssignStatement(name, args, this.blockOrStatement());
	}

	assignStatement(){
		let current = this.get(0);

		if(this.match('WORD')){
			if(this.match('LPAREN')){
				let args = [];

				while(!this.match('RPAREN')){
					args.push(this.expression());
					this.match('COMMA');
				}

				return new statements.FunctionStatement(current.value, args);
			}else if(this.match('EQ')) return new statements.AssignStatement(current.value, this.expression());
		}else throw new Error('Unknown statement: ' + this.get(0).type);
	}

	callStatement(){
		let name = this.get(0);
		this.match('WORD');
		return new statements.CallStatement(name.value);
	}

	forStatement(){
		this.match('LPAREN');
		let assign = this.statement();
		this.match('COMMA');
		let condition = this.expression();
		this.match('COMMA');
		let incr = this.statement();
		this.match('RPAREN');
		let body = this.blockOrStatement();

		return new statements.ForStatement(assign, condition, incr, body);
	}

	whileStatement(){
		let condition = this.expression();
		let body = this.blockOrStatement();
		return new statements.WhileStatement(condition, body);
	}

	ifStatement(){
		let condition = this.expression();
		let body = this.blockOrStatement();
		let elseBlock;

		if(this.match('ELSE')) elseBlock = this.statement();

		return new statements.IfStatement(condition, body, elseBlock ? elseBlock : undefined);
	}

	expression(){
		return this.logical();
	}

	logical(){
		let expr = this.equation();

		while(true){
			if(this.match('OR')){
				expr = new expressions.ConditionalExpression('||', expr, this.equation());
				continue;
			}
			if(this.match('AND')){
				expr = new expressions.ConditionalExpression('&&', expr, this.equation());
				continue;
			}
			break;
		}

		return expr;
	}

	equation(){
		let expr = this.conditional();

		while(true){
			if(this.match('EQEQ')){
				expr = new expressions.ConditionalExpression('==', expr, this.conditional());
				continue;
			}
			if(this.match('NOTEQ')){
				expr = new expressions.ConditionalExpression('!=', expr, this.conditional());
				continue;
			}
			break;
		}

		return expr;
	}

	conditional(){
		let expr = this.multiplicative();

		while(true){
			if(this.match('LT')){
				expr = new expressions.ConditionalExpression('<', expr, this.multiplicative());
				continue;
			}
			if(this.match('GT')){
				expr = new expressions.ConditionalExpression('>', expr, this.multiplicative());
				continue;
			}
			if(this.match('LTEQ')){
				expr = new expressions.ConditionalExpression('<=', expr, this.multiplicative());
				continue;
			}
			if(this.match('GTEQ')){
				expr = new expressions.ConditionalExpression('>=', expr, this.multiplicative());
				continue;
			}
			break;
		}

		return expr;
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
			if(this.match('PERCENT')){
				expr = new expressions.BinaryExpression('%', expr, this.primary());
				continue;
			}
			break;
		}

		return expr;
	}

	// unary(){
	// 	let expr = this.primary();

	// 	while(true){
	// 		if(this.match('MINUS')){
	// 			console.log(expr);
	// 			expr = new expressions.UnaryExpression('-', expr);
	// 			continue;
	// 		}
	// 		break;
	// 	}

	// 	return expr;
	// }

	primary(){
		let current = this.get(0);

		if(this.match('NUM')) return new expressions.NumberExpression(parseFloat(current.value));
		else if(this.match('STRING')) return new expressions.StringExpression(current.value);
		else if(this.match('LPAREN')) return this.expressionInParens();
		else if(this.match('TRUE')) return new expressions.BooleanExpression(true);
		else if(this.match('FALSE')) return new expressions.BooleanExpression(false);
		else if(this.match('WORD')) return this.wordExpression(current.value);
		else if(this.match('UNKNOWN')) return new expressions.UnknownExpression();
		else if(this.match('LBRACE')) return this.arrayExpression();
		else throw new Error('Unknown expression: ' + current.type);
	}

	expressionInParens(){
		let expr = this.expression();
		this.match('RPAREN');
		return expr;
	}

	arrayExpression(){
		let items = [];
		while(!this.match('RBRACE')){
			items.push(this.expression());
			this.match('COMMA');
		}

		return new expressions.ArrayExpression(items);
	}

	wordExpression(name){
		if(this.match('LBRACE')){
			let indices = [];

			do{
				indices.push(this.expression());
				this.match('RBRACE');
			}while(this.match('LBRACE'));
			
			return new expressions.ArrayAccessExpression(name, indices);
		}else if(this.match('LPAREN')){
			let args = [];

			while(!this.match('RPAREN')){
				args.push(this.expression());
				this.match('COMMA');
			}

			return new expressions.FunctionExpression(name, args);
		}

		return new expressions.VariableExpression(name);
	}
}

module.exports = Parser;