const {hash, compare} = require("bcryptjs");

const encrypt = async (passwordPlain) => {
  const hashPassword = await hash(passwordPlain, 10);
  return hashPassword;
};

const comparePassword = async (passwordPlain, hashPassword) => {
  return await compare(passwordPlain, hashPassword);
};

module.exports = {
  encrypt,
  comparePassword
};
