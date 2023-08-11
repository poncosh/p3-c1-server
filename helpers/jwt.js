const jwt = require("jsonwebtoken");

const signToken = (data) => {
  const { id, username, email } = data;
  return jwt.sign({ id, username, email }, process.env.SECRET_ACCESS_TOKEN);
};

const verifyToken = (accessToken) => {
  return jwt.verify(accessToken, process.env.SECRET_ACCESS_TOKEN);
};

module.exports = {
  signToken,
  verifyToken,
};
