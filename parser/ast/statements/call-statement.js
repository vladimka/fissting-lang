const Variables = require('../../../lib/variables');
const { StringValue } = require('../../../lib/values/');

class CallStatement{
	constructor(callName){
		this.callName = callName;
		this.name = "CallStatement";
	}

	execute(){
		switch(this.callName){
			case 'print': this.print(); break;
			case 'get_input': this.get_input(); break;
			case 'cls': this.cls(); break;
			default:
				throw new Error('Unknown system function "' + this.callName + '"');
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
		Variables.set("out", new StringValue(""));
		console.clear();
	}
}

module.exports = CallStatement;