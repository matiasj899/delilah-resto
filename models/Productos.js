const Sequelize = require("sequelize");
const db = require("../config/database.js");

const Producto = db.define(
  "products",
  {
    name: {
      type: Sequelize.STRING(255),
    },
    price: {
      type: Sequelize.FLOAT,
    },
    img: {
      type: Sequelize.STRING(2083),
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Producto;
