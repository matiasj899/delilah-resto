const Sequelize = require("sequelize");
const db = require("../config/database.js");
const bcrypt = require("bcrypt");

const User = db.define(
  "users",
  {
    username: {
      type: Sequelize.STRING(255),
      allowNull: false,
      validate: {
        notNull: { msg: "username required" },
      },
    },
    name: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    lastname: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING(255),
      allowNull: false,
      unique: true,
      isEmail: true,
    },
    phone: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    adress: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    admin: {
      type: Sequelize.TINYINT,
      allowNull: false,
      defaultValue: 0,
    },
    password: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = User;
