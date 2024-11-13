const bcrypt = require("bcrypt");

module.exports.hashValue = async (val) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(val, salt);
  return hash;
};

module.exports.compareHash = async (val, encrypted) => {
  return await bcrypt.compare(val, encrypted);
};
