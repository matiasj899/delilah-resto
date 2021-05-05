const dotenv = require("dotenv");
const express = require("express");
const Sequelize = require("sequelize");
const jwt = require("jsonwebtoken");

const db = require("./config/database");
dotenv.config({ path: "./config/config.env" });

const app = express();

const pedidos = require("./routes/pedidos");
const productos = require("./routes/productos");
const user = require("./routes/user");
const PORT = process.env.PORT || 5000;

dbConnection();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
//ROUTES
app.use("/Delilah-Resto/Pedidos", pedidos);
app.use("/Delilah-Resto/Productos", productos);
app.use("/Delilah-Resto/User", user);

async function dbConnection() {
  try {
    await db.authenticate();
    console.log("DataBase online");
  } catch (error) {
    throw new Error(error);
  }
}

app.listen(PORT, console.log("escuchando servidor :", process.env.NODE_ENV));
