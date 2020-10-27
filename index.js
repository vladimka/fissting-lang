#!/usr/bin/env node
const Interpreter = require('./interpreter');
const interpreter = new Interpreter(process.argv[2]);
const args = require('yargs').argv;

interpreter.interpret(args);