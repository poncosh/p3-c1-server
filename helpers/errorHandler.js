const { ValidationError } = require("sequelize");

module.exports = (err, req, res, next) => {
  console.log(err);
  let message = "Internal server error";
  let code = 500;

  if (err instanceof ValidationError) {
    message = err.errors.map((el) => el.message);
    code = 400;
  }
  switch (err.name) {
    case "SequelizeValidationError":
    case "SequelizeUniqueConstraintError":
      message = err.errors.map((el) => el.message);
      code = 400;
      break;

    default:
      break;
  }

  res.status(code).json({
    message,
  });
};
