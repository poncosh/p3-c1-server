"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate(models) {
      this.hasMany(models.Tag, { foreignKey: "postId" });
      this.belongsTo(models.User, { foreignKey: "authorId" });
      this.belongsTo(models.Category, { foreignKey: "categoryId" });
    }
  }
  Post.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Title cannot be null",
          },
          notEmpty: {
            msg: "Title cannot be empty",
          },
        },
      },
      slug: DataTypes.STRING,
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Content cannot be null",
          },
          notEmpty: {
            msg: "Content cannot be empty",
          },
        },
      },
      imgUrl: DataTypes.STRING,
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Category ID cannot be null",
          },
          notEmpty: {
            msg: "Category ID cannot be empty",
          },
        },
      },
      authorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Author ID cannot be null",
          },
          notEmpty: {
            msg: "Author ID cannot be empty",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Post",
    }
  );

  Post.addHook("beforeCreate", (instance, options) => {
    instance.slug = instance.title
      .toLowerCase()
      .split(" ")
      .join("-")
      .replace(/[^\w\s]/gi, "");
  });
  return Post;
};
