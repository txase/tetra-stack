
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
    console.log(`Message: ${(new Date()).toTimeString()} ${message.method}`)
    done({
      statusCode: 200,
      headers: {
        "Content-Type": "text/html"
      },
      body: index
    })
  } else if (message.method == 'POST') {
    console.log(`Message: ${(new Date()).toTimeString()} ${message.method} ${JSON.stringify(message.params)} ${message.body}`)
    var pwd = '00000000';
    if (message.params.headers['Content-Type'] == "application/json") {
      let body = JSON.parse(message.body);
      pwd = body.uid;
    } else if (message.params.headers['Content-Type'].index("application/x-www-form-urlencoded") != -1) {

    }
    /*
    var pwd = pad(8, PWDGen(uid).toString(16), '0');
    */
    console.log(uid, '=>', pwdgen(uid));
    done({
      statusCode: 200,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({pwd: pwd})
    })
  }
}
