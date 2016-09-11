
"use strict"

var fs = require('fs');
var pwdgen = require('./PWDGen');
var index = require("./index.html");

require.extensions['.html'] = function htmlRequire(module, filename) {
	module.exports = fs.readFileSync(filename, 'utf8');
};

module.exports = function handler(message, output) {
	// The following are examples of things you can do in a function.

	// Log to the console.
	console.log(`Message: ${JSON.stringify(message, null, 2)}`)


	/*
	* Detect verb, have one file for returning HTML on GET, and another for calculating pwd on POST
	*
	var pwd = pad(8, PWDGen(uid).toString(16), '0');
	console.log(uid,'=>',pwdgen(uid))
	*/
	var pwd = '00000000';


	// Send a message to other nodes connected to the first output.
	let outputMessage = "Hello, nodes!"
	let outputPromise = output(0, outputMessage)

	if (method == 'GET') {
		let response = {
			statusCode: 200,
			headers: {
				"Content-Type": "text/html"
			},
			body: index
		}
	} elseif (method == 'POST') {
		let response = {
			statusCode: 200,
			headers: {
				"Content-Type": "application/json"
			},
			body: {pwd: pwd}
		}

	}

	// Return a Promise that resolves when processing is complete.
	// We wait for the output message to be sent, then we respond
	// with an HTTP response.
	return outputPromise.then(() => response)
}
