const LexerError = require('./error');
const Token = require('./token');

const op_regexp = /[+-\/*\(\)<>!=|&]/;
const op_tokens = {
	'+' : 'PLUS',
	'-' : 'MINUS',
	'/' : 'SLASH',
	'*' : 'STAR',
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
		let buffer = '';

		while(true){
			if(current != ' ')
				break;

			buffer += current;
			current = this.next();
		}

		this.pushToken('SPACE', buffer);
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
			if(op_tokens[buffer + current] != undefined){
				this.pushToken(op_tokens[buffer + current]);
				this.next();
				break;
			}

			buffer += current;
			current = this.next();
		}
	}

	tokenizeNewLine(){
		this.line++;
		this.column = 1;
		// this.pushToken('NEW_LINE');
		this.next();
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

	tokenize(){
		let current = this.peek(0);

		while(current != '\0'){
			if(/\d/.test(current)) this.tokenizeNumber();
			else if(op_regexp.test(current)) this.tokenizeOperation();
			else if(current == ' ') this.tokenizeWhitespaces();
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