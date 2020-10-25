const Variables = require('../../../lib/variables');

class PrintStatement{
	execute(){
		let out = Variables.get('out').asString();
		if(/\{(?<name>\w+)\}/.test(out)){
			let matches = out.match(/\{(?<name>\w+)\}/g);
			for(let match of matches){
				out = out.replace(match, Variables.get(match.replace(/[{}]/g, '')).asString());
			}
		}
		process.stdout.write(out);
	}
}

module.exports = PrintStatement;