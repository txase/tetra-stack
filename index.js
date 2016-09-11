
"use strict"

var fs = require('fs');
var pwdgen = require('./PWDGen');

//http://stackoverflow.com/a/12753026/1112230
require.extensions['.html'] = function htmlRequire(module, filename) {
	module.exports = fs.readFileSync(filename, 'utf8');
};
var index = require("./index.html");

module.exports = function handler(message, output, done) {
	if (message.method == 'GET') {
	  console.log(`Message: ${Date.now().toISOString()} ${message.method}`)
		done({
			statusCode: 200,
			headers: {
				"Content-Type": "text/html"
			},
			body: index
		})
	} else if (message.method == 'POST') {
    /*
    var pwd = pad(8, PWDGen(uid).toString(16), '0');
    console.log(uid,'=>',pwdgen(uid))
    */

	  var pwd = '00000000';
	  console.log(`Message: ${Date.now().toISOString()} ${message.method} ${message.body}`)
		done({
			statusCode: 200,
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({pwd: pwd})
		})
	}
}
