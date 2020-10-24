const LexerError = require('./error');
const Token = require('./token');

const op_regexp = /[+-\/*\(\)]/;
const op_tokens = {
	'+' : 'PLUS',
	'-' : 'MINUS',
	'/' : 'SLASH',
	'*' : 'STAR',
	'(' : 'LBRACE',
	')' : 'RBRACE'
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
			if(!op_regexp.test(current))
				break;

			buffer += current;
			current = this.next();
		}

		this.pushToken(op_tokens[buffer]);
	}

	tokenizeNewLine(){
		this.line++;
		this.column = 1;
		this.pushToken('NEW_LINE');
		this.next();
	}

	tokenize(){
		let current = this.peek(0);

		while(current != '\0'){
			if(/\d/.test(current)) this.tokenizeNumber();
			else if(op_regexp.test(current)) this.tokenizeOperation();
			else if(current == ' ') this.tokenizeWhitespaces();
			else if(/\n+/.test(current)) this.tokenizeNewLine();
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