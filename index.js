
"use strict"

var fs = require('fs');
var pwdgen = require('./PWDGen');

//http://stackoverflow.com/a/12753026/1112230
require.extensions['.html'] = function htmlRequire(module, filename) {
	module.exports = fs.readFileSync(filename, 'utf8');
};
var index = require("./index.html");

module.exports = function handler(message, output, done) {
	// The following are examples of things you can do in a function.

	// Log to the console.
	console.log(`Message: ${Date.now()} ${message.method}`)

	/*
	* Detect verb, have one file for returning HTML on GET, and another for calculating pwd on POST
	*
	var pwd = pad(8, PWDGen(uid).toString(16), '0');
	console.log(uid,'=>',pwdgen(uid))
	*/
	var pwd = '00000000';

	if (message.method == 'GET') {
		done({
			statusCode: 200,
			headers: {
				"Content-Type": "text/html"
			},
			body: index
		})
	} else if (message.method == 'POST') {
		done({
			statusCode: 200,
			headers: {
				"Content-Type": "application/json"
			},
			body: {pwd: pwd}
		})
	}

}
