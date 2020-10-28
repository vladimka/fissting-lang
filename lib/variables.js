const values = require('./values/');
const StringExpression = require('../parser/ast/expressions/string-expression');

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
	"length" : new values.FunctionValue(args => {
		return new values.NumberValue(args[0].eval().value.length);
	}),
	"typeof" : new values.FunctionValue(args => {
		return new values.StringValue(args[0].eval().type);
	}),
	"time" : new values.FunctionValue(args => new values.NumberValue(Date.now())),
	"out" : new values.StringValue(""),
	"split" : new values.FunctionValue(args => {
		let str = args[0].eval().asString();
		let split_symbol = args[1].eval().asString();

		let splitted_array = str.split(split_symbol).map(el => new StringExpression(el));

		return new values.ArrayValue(splitted_array);
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