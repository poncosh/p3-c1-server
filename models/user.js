"use strict";
const bcrypt = require("bcryptjs");

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    comparePassword(plainPassword) {
      return bcrypt.compareSync(plainPassword, this.password);
    }

    static associate(models) {
      this.hasMany(models.Post, { foreignKey: "authorId" });
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          args: true,
          msg: "Username has already been registered",
        },
        validate: {
          notNull: {
            msg: "Username cannot be null",
          },
          notEmpty: {
            msg: "Username cannot be empty",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          args: true,
          msg: "Email has already been registered",
        },
        validate: {
          notNull: {
            msg: "Email cannot be null",
          },
          notEmpty: {
            msg: "Email cannot be empty",
          },
          isEmail: {
            msg: "Invalid email format",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Password cannot be null",
          },
          notEmpty: {
            msg: "Password cannot be empty",
          },
          min: {
            args: [6],
            msg: "Password length minimum is 6 characters",
          },
        },
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Role cannot be null",
          },
          notEmpty: {
            msg: "Role cannot be empty",
          },
        },
      },
      phoneNumber: {
        type: DataTypes.STRING,
        validate: {
          not: {
            args: ["^d+$", "i"],
            msg: "Invalid phone number format",
          },
        },
      },
      address: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  User.addHook("beforeCreate", async (instance, options) => {
    try {
      instance.password = await bcrypt.hash(instance.password, 10);
    } catch (error) {
      throw new Error("Failed hashing password");
    }
  });
  return User;
};
