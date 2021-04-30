const bcrypt = require("bcrypt");
const saltRounds = 10;
const User = require("../models/Users");
const jwt = require("jsonwebtoken");

//CREAR USUARIO
const createUser = async (req, res) => {
  try {
    const {
      username,
      name,
      lastname,
      email,
      phone,
      adress,
      password,
      admin
    } = req.body;

    const hashedPassword = await bcrypt.hash(
      password,
      saltRounds,
      async function (err, hash) {
        if (hash) {
          const newUser = await User.create({
            username,
            name,
            lastname,
            email,
            phone,
            adress,
            password: hash,
      admin

          });

          res.status(200).json({
            status: 200,
            mensaje: "Usuario creado exitosamente.",
          });
        } else {
          res.status(400).json({
            status: 400,
            err,
          });
        }
      }
    );
  } catch (error) {
    res.status(400).json({
      status: 400,
      error: error,
    });
  }
};

//LOGIN USUARIO

const loginUser = async (req, res) => {
  console.log("en el login..")
  const { username, password } = req.body;
  const users = await User.findOne({
    where: { username: username }
  });
  if (users == null) {
    return res.status(400).json({
      status: 400,
      mensaje: "Este usuario no se encuentra registrado.",
    });
  }
  try {
    await bcrypt.compare(password, users.password, function (err, result) {
      if (result === true) {
        const token = jwt.sign(
          {
            id: users.id,
            username: users.username,
            name: users.name,
            email: users.email,
          },
          process.env.JWT_SECRET_WORD,
          {
            expiresIn: process.env.JWT_EXPIRES,
          }
        );
        if (token) {
          return res.status(200).json({
            status: 200,
            id: users.id,
            username: users.username,
            name: users.name,
            email: users.email,
            token,
            mensaje: "Usuario logeado.",
          });
        }
        return res.status(400).json({
          status: 400,
          error: "bad credentials.",
        });
      } else {
        return res.status(400).json({
          status: 400,
          err,
          mensaje: "Contraseña incorrecta.",
        });
      }
    });
  } catch (error) {
    return res.status(400).json({
      status: 400,
      error,
    });
  }
};

const getUser = async (req, res) => {
  const users = await User.findAll();
  if (users) {
    res.status(200).json({
      status: 200,
      mensaje: "Devolviendo USER",
      users,
    });
  }
};

module.exports = { createUser, loginUser, getUser };
