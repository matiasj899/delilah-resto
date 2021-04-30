const User = require("../models/Users");
const jwt = require("jsonwebtoken");

const validarDatosUser = async (req, res, next) => {
  console.log("validando datos...");
  const {
    username,
    name,
    lastname,
    email,
    phone,
    adress,
    password,
  } = await req.body;
  if (
    !username ||
    !name ||
    !lastname ||
    !email ||
    !phone ||
    !adress ||
    !password
  ) {
    res.status(400).json({
      status: 400,
      mensaje: "Datos incompletos, intentelo nuevamente.",
    });
  } else {
    next();
  }
};

const isAdmin = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  if (token && token.startsWith("Bearer ")) {
    token = token.slice(7, token.length);
  }
  if (token) {
    try {
      const decodedUser = jwt.verify(token, process.env.JWT_SECRET_WORD);

      const userFromToken = await User.findByPk(decodedUser.id);

      if (userFromToken.admin == 1) {
        next();
      } else {
        res.status(400).json({
          status: 400,
          mensaje: "acceso denegado.",
        });
      }
    } catch (error) {
      res.status(400).json({
        status: 400,
        mensaje: error,
      });
    }
  }
};

const userData = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  if (token && token.startsWith("Bearer ")) {
    token = token.slice(7, token.length);
  }
  if (token) {
    try {
      const decodedUser = jwt.verify(token, process.env.JWT_SECRET_WORD);

      const userFromToken = await User.findByPk(decodedUser.id);

      if (userFromToken.admin == 1) {
        next();
      } else {
        res.status(200).json({
          status: 200,
          info: userFromToken,
        });
      }
    } catch (error) {
      res.status(400).json({
        status: 400,
        mensaje: error,
      });
    }
  }
};

module.exports = { validarDatosUser, isAdmin, userData };
