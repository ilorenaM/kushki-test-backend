const bcrypt = require('bcrypt');

async function hashPassword(pass) {
  const hash = await bcrypt.hash(pass, 10);
  return hash;
}

async function passwordCheck(hashPassword, pass) {
    const isMatch = await bcrypt.compare(pass, hashPassword);
    return isMatch;
  }
module.exports = {
    hashPassword,
    passwordCheck
}