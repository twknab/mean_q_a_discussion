// Provide access to .env config file
require('dotenv').config();
// Setup json web tokens:
var jwt = require('jsonwebtoken'); // JSON Web Tokens
let myToken;

module.exports = {
  create: function(payload) {
    myToken = jwt.sign({ username: payload }, process.env.TOKEN_SECRET, {expiresIn: '6h'});
    console.log("Token created:", myToken);
    return myToken;
  },
  getPayload: function() {
    payload = jwt.verify(myToken, process.env.TOKEN_SECRET)
    return payload;
  },
  getToken: function() {
    return myToken;
  },
}
