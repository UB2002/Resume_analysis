const crypto = require("crypto-js");
require("dotenv").config();

function encrypt(data){
  return crypto.AES.encrypt(data, process.env.SECRET_KEY).toString();
}
function decrypt(data) {    
    if (!data) return ""; // Prevent errors on undefined/null values
    const bytes = crypto.AES.decrypt(data, process.env.SECRET_KEY);
    return bytes.toString(crypto.enc.Utf8);
}

module.exports = { encrypt, decrypt };