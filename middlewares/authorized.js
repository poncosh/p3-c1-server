const { Post } = require("../models");

module.exports = async (req, res, next) => {
  try {
    const { postId } = req.params;

    const tryDelete = await Post.findByPk(postId);

    if (req.user.id !== tryDelete.authorId) {
      throw { name: "Forbidden" };
    }

    next();
  } catch (error) {
    next(error);
  }
};
