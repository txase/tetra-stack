
"use strict"

var fs = require('fs');
var qs = require('querystring');
var pwdgen = require('./PWDGen');

//http://stackoverflow.com/a/12753026/1112230
require.extensions['.html'] = function htmlRequire(module, filename) {
  module.exports = fs.readFileSync(filename, 'utf8');
};
var index = require("./index.html");

module.exports = function handler(message, output, done) {
  console.log(`Message: ${(new Date()).toTimeString()} ${message.method} ${message.resource}`)
  if (message.method == 'GET') {
    done({
      statusCode: 200,
      headers: {
        "Content-Type": "text/html"
      },
      body: index
    })
  } else if (message.method == 'POST') {
    var pwd = '00000000';
    var uid = '04000000000000';
    if (message.headers['Content-Type'] == "application/json") {
      let body = JSON.parse(message.body);
      uid = body.uid;
    } else if (message.headers['Content-Type'].indexOf("application/x-www-form-urlencoded") != -1) {
      let body = qs.parse(message.body.toString());
      uid = body.uid;
    } else {
      done({
        statusCode: 400,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({error: "Unknown Content-Type"})
      })
    }
    //pwd = pad(8, PWDGen(uid).toString(16), '0');
    pwd = pwdgen(uid);
    console.log(uid, '=>', pwd);
    done({
      statusCode: 200,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({pwd: pwd})
    })
  }
}

