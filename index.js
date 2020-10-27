#!/usr/bin/env node
const Interpreter = require('./interpreter');
const interpreter = new Interpreter(process.argv[2]);

interpreter.interpret();