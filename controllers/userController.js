const { User, Post, Tag, Category } = require("../models");

const mainPage = async (req, res, next) => {
  try {
    const popularNews = await Post.findAll({
      limit: 6,
      offset: 0,
      include: [
        { model: Tag },
        {
          model: Category,
          where: {
            name: "Popular",
          },
        },
        {
          model: User,
          attributes: {
            exclude: ["email", "password", "phoneNumber", "address", "role"],
          },
        },
      ],
    });
    const focusNews = await Post.findAll({
      limit: 6,
      offset: 0,
      include: [
        { model: Tag },
        {
          model: Category,
          where: {
            name: "Focus",
          },
        },
        {
          model: User,
          attributes: {
            exclude: ["email", "password", "phoneNumber", "address", "role"],
          },
        },
      ],
    });
    const mainNews = await Post.findAll({
      limit: 6,
      offset: 0,
      include: [
        { model: Tag },
        {
          model: Category,
          where: {
            name: "Main",
          },
        },
        {
          model: User,
          attributes: {
            exclude: ["email", "password", "phoneNumber", "address", "role"],
          },
        },
      ],
    });
    const latestNews = await Post.findAll({
      limit: 6,
      offset: 0,
      include: [
        { model: Tag },
        { model: Category },
        {
          model: User,
          attributes: {
            exclude: ["email", "password", "phoneNumber", "address", "role"],
          },
        },
      ],
      order: [["updatedAt", "DESC"]],
    });

    res.status(200).json({
      popular: popularNews,
      focus: focusNews,
      main: mainNews,
      latest: latestNews,
    });
  } catch (error) {
    next(error);
  }
};

const detailPage = async (req, res, next) => {
  try {
    const { slug } = req.params;

    const dataDetail = await Post.findOne({
      where: {
        slug,
      },
      include: [
        { model: Tag },
        { model: Category },
        {
          model: User,
          attributes: {
            exclude: ["email", "password", "phoneNumber", "address", "role"],
          },
        },
      ],
    });
    if (!dataDetail) throw { name: "NotFound" };

    res.status(200).json(dataDetail);
  } catch (error) {
    next(error);
  }
};

module.exports = { mainPage, detailPage };
