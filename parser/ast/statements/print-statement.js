const Variables = require('../../../lib/variables');

class PrintStatement{
	execute(){
		process.stdout.write(Variables.get('out').asString());
	}
}

module.exports = PrintStatement;