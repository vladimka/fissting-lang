const LexerError = require('./error');
const Token = require('./token');

const op_regexp = /[+-\/*\(\)<>!=|&%]/;
const op_tokens = {
	'+' : 'PLUS',
	'-' : 'MINUS',
	'/' : 'SLASH',
	'*' : 'STAR',
	'%' : 'PERCENT',
	'(' : 'LBRACE',
	')' : 'RBRACE',
	'<' : 'LT',
	'>' : 'GT',
	'<=' : 'LTEQ',
	'>=' : 'GTEQ',
	'==' : 'EQ',
	'!=' : 'NOTEQ',
	'||' : 'OR',
	'&&' : 'AND'
}

class Lexer{
	constructor(input){
		this.input = input;
		this.tokens = [];
		this.pos = 0;
		this.column = 1;
		this.line = 1;
	}

	peek(pos){
		let offset = this.pos + pos;

		if(offset >= this.input.length)
			return '\0';

		return this.input[offset];
	}

	next(){
		this.pos++;
		this.column++;
		return this.peek(0);
	}

	tokenizeWhitespaces(){
		let current = this.peek(0);

		while(true){
			if(current != ' ')
				break;

			current = this.next();
		}
	}

	tokenizeNumber(){
		let current = this.peek(0);
		let buffer = '';

		while(true){
			if(current == '.')
				if(buffer.indexOf('.') == -1){
					buffer += '.';
					current = this.next();
					continue;
				}else new LexerError(this.column, this.line, current).throw();

			if(!/\d/.test(current))
				break;

			buffer += current;
			current = this.next();
		}

		this.pushToken('NUM', buffer);
	}

	tokenizeOperation(){
		let current = this.peek(0);
		let buffer = '';

		while(true){
			if(current == '/'){
				if(this.peek(1) == '/'){
					this.tokenizeComment();
					break;
				}
			}

			if(op_tokens[buffer + current] != undefined){
				this.pushToken(op_tokens[buffer + current]);
				this.next();
				break;
			}

			buffer += current;
			current = this.next();
		}
	}

	tokenizeComment(){
		this.next();
		this.next();
		while(true){
			if(/[\r\n]/.test(this.peek(0)))
				break;

			this.next();
		}
	}

	tokenizeNewLine(){
		let current = this.peek(0);

		while(true){
			if(!/[\r\n]/.test(current))
				break;

			this.line++;
			current = this.next();
		}
		this.column = 1;
	}

	tokenizeWord(){
		let current = this.peek(0);
		let buffer = '';

		while(true){
			if(!/\w/.test(current))
				break;

			buffer += current;
			current = this.next();
		}

		switch(buffer){
			case 'put': this.pushToken('PUT'); break;
			case 'in': this.pushToken('IN'); break;
			case 'print': this.pushToken('PRINT'); break;
			case 'true': this.pushToken('TRUE'); break;
			case 'false': this.pushToken('FALSE'); break;
			case 'unknown': this.pushToken('UNKNOWN'); break;
			case 'if': this.pushToken('IF'); break;
			case 'else': this.pushToken('ELSE'); break;
			case 'begin': this.pushToken('BEGIN'); break;
			case 'end': this.pushToken('END'); break;
			case 'while': this.pushToken('WHILE'); break;
			case 'break': this.pushToken('BREAK'); break;
			default: this.pushToken('WORD', buffer);
		}
	}

	tokenizeString(){
		let current = this.next();
		let buffer = '';

		while(true){
			if(current == '"')
				break;

			buffer += current;
			current = this.next();
		}
		this.next();
		this.pushToken('STRING', buffer);
	}

	tokenizeTabs(){
		let current = this.peek(0);

		while(true){
			if(current != '\t')
				break;

			current = this.next();
		}
	}

	tokenize(){
		let current = this.peek(0);

		while(current != '\0'){
			if(/\d/.test(current)) this.tokenizeNumber();
			else if(op_regexp.test(current)) this.tokenizeOperation();
			else if(current == ' ') this.tokenizeWhitespaces();
			else if(current == '\t') this.tokenizeTabs();
			else if(/[\r\n]/.test(current)) this.tokenizeNewLine();
			else if(/\w/.test(current)) this.tokenizeWord();
			else if(current == '"') this.tokenizeString();
			else new LexerError(this.column, this.line, current).throw();

			current = this.peek(0);
		}

		return this.tokens;
	}

	pushToken(type, value=''){
		this.tokens.push(new Token(type, value));
	}
}

module.exports = Lexer;