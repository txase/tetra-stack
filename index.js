
"use strict"

function handler(message, output) {
  // The following are examples of things you can do in a function.

  // Log to the console.
  console.log(`Message: ${JSON.stringify(message, null, 2)}`)


/*
 * Detect verb, have one file for returning HTML on GET, and another for calculating pwd on POST
 *
var ld = require('node-ld');

var pwd = pad(8, PWDGen(uid).toString(16), '0');
var pwdgen = ld.PWDGen;
console.log(uid,'=>',pwdgen(uid))
*/



  // Send a message to other nodes connected to the first output.
  let outputMessage = "Hello, nodes!"
  let outputPromise = output(0, outputMessage)

  // Build a response. This is an example of an HTTP response.
  let response = {
    statusCode: 200,
    headers: {
      "Content-Type": "text/html"
    },
    body: "<H4>Hello, world!</H4>"
  }

  // Return a Promise that resolves when processing is complete.
  // We wait for the output message to be sent, then we respond
  // with an HTTP response.
  return outputPromise.then(() => response)
}

