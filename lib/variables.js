const values = require('./values/');

let variables = {
	"pi" : new values.NumberValue(Math.PI)
};

class Variables{
	static get(name){
		return variables[name];
	}

	static set(name, value){
		variables[name] = value;
	}
}

module.exports = Variables;