const values = require('./values/');

let variables = {
	"pi" : new values.NumberValue(Math.PI),
	"nl" : new values.StringValue("\n"),
	"cos" : new values.FunctionValue(n => {
		return new values.NumberValue(Math.cos(n.eval().asNumber()))
	})
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