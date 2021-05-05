const express = require("express");
const { isAdmin, userData } = require("../middlewares/usersMiddleware");
const {
  createUser,
  loginUser,
  getUser,
} = require("../controllers/usersController");
//const validarDatos=require("../middlewares/usersMiddleware")
const route = express.Router();

route.post("/signup", createUser);
route.post("/login", loginUser);
route.get("/", userData, getUser);

module.exports = route;
