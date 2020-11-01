const values = require('../values/');
const Variables = require('../variables');

module.exports = function(){
	Variables.set("nl", new values.StringValue('\n'));
	Variables.set("typeof", new values.FunctionValue(args => {
		return new values.StringValue(args[0].eval().type);
	}));
	Variables.set("fl_version", new values.StringValue("0.1.1"));
}

// const values = require('../values/');
// const Variables = require('../variables');

// module.exports = function(){

// }