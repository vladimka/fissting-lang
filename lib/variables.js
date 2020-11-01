const values = require('./values/');
const StringExpression = require('../parser/ast/expressions/string-expression');
const Interpreter = require('../interpreter');

let variables = {
	"PI" : new values.NumberValue(Math.PI),
	"E" : new values.NumberValue(Math.E),
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
	"time" : new values.FunctionValue(args => new values.NumberValue(Date.now())),
	"out" : new values.StringValue(""),
	"split" : new values.FunctionValue(args => {
		let str = args[0].eval().asString();
		let split_symbol = args[1].eval().asString();

		let splitted_array = str.split(split_symbol).map(el => new StringExpression(el));

		return new values.ArrayValue(splitted_array);
	}),
	"sqrt" : new values.FunctionValue(args => new values.NumberValue(Math.sqrt(args[0].eval().asNumber()))),
	"sqr" : new values.FunctionValue(args => new values.NumberValue(Math.pow(args[0].eval().asNumber(), 2))),
	"string" : new values.FunctionValue(args => new values.StringValue(args[0].eval().asString())),
	"charAt" : new values.FunctionValue(args => {
		let text = args[0].eval().asString();
		let pos = args[1].eval().asNumber();
		let char = text[pos];

		if(char == undefined)
			return new values.UnknownValue();

		return new values.StringValue(char);
	}),
	"isDigit" : new values.FunctionValue(args => new values.BooleanValue(/[0-9]/.test(args[0].eval().asString()))),
	"push" : new values.FunctionValue(args => {
		let arr = args[0].eval();
		arr.push(args[1].eval());
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