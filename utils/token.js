const jwt = require("jsonwebtoken");

const jwt_secret_key = process.env.JWT_SECRET_KEY;

module.exports.generateToken = (payload) => {
  return jwt.sign(payload, jwt_secret_key, {
    expiresIn: "1d",
  });
};

module.exports.verifyToken = (token) => {
  return jwt.verify(token, jwt_secret_key);
};
