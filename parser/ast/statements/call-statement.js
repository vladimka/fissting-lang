const Variables = require('../../../lib/variables');
const { StringValue } = require('../../../lib/values/');

class CallStatement{
	constructor(name){
		this.name = name;
	}

	execute(){
		switch(this.name){
			case 'print': this.print(); break;
			case 'get_input': this.get_input(); break;
			case 'cls': this.cls(); break;
			default:
				throw new Error('Unknown system function "' + this.name + '"');
		}
	}

	print(){
		let out = Variables.get('out').asString();
		if(/\{(?<name>\w+)\}/.test(out)){
			let matches = out.match(/\{(?<name>\w+)\}/g);
			for(let match of matches){
				out = out.replace(match, Variables.get(match.replace(/[{}]/g, '')).asString());
			}
		}
		process.stdout.write(out);
	}

	get_input(){
		process.stdin.setEncoding('utf8');
		process.stdin.on('data', chunk => {
			Variables.set("input", new StringValue(chunk));
			process.stdin.pause();
		});
		process.stdin.resume();
	}

	cls(){
		console.clear();
	}
}

module.exports = CallStatement;