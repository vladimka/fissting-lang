const values = require('./values/');

let variables = {
	"pi" : new values.NumberValue(Math.PI),
	"nl" : new values.StringValue("\n")
};

class Variables{
	static get(name){
		return variables[name] || new values.UnknownValue();
	}

	static set(name, value){
		variables[name] = value;
	}
}

module.exports = Variables;