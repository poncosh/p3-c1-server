const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models");

module.exports = async (req, res, next) => {
  try {
    const { access_token } = req.headers;
    if (!access_token) throw { name: "NoToken" };
    const payload = verifyToken(access_token);

    const data = await User.findByPk(payload.id);
    if (!data) throw { name: "Unauthorized" };
    req.user = {
      id: data.id,
      email: data.email,
      role: data.role,
    };

    next();
  } catch (error) {
    next(error);
  }
};
