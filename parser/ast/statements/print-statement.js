const Variables = require('../../../lib/variables');

class PrintStatement{
	execute(){
		console.log(Variables.get('out').asString());
	}
}

module.exports = PrintStatement;