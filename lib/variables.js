const values = require('./values/');

let variables = {
	"PI" : new values.NumberValue(Math.PI),
	"E" : new values.NumberValue(Math.E),
	"nl" : new values.StringValue("\n"),
	"rand" : new values.FunctionValue(args => {
		let min = args[0].eval().asNumber();
		let max = args[1].eval().asNumber();

		return new values.NumberValue(min + Math.round(Math.random() * (max - min)));
	}),
	"concat" : new values.FunctionValue(args => {
		return new values.StringValue(args.map(arg => arg.eval().asString()).join(" "));
	}),
	"join" : new values.FunctionValue(args => {
		let arr = args[0].eval().value.map(val => val.eval().asString());
		return new values.StringValue(arr.join(args[1].eval().asString()));
	}),
	"len" : new values.FunctionValue(args => {
		return new values.NumberValue(args[0].eval().value.length);
	})
}

class Variables{
	static get(name){
		return variables[name] || new values.UnknownValue();
	}

	static set(name, value){
		variables[name] = value;
	}
}

module.exports = Variables;