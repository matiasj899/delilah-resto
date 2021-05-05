const User = require("../models/Users");
const jwt = require("jsonwebtoken");
//const Pedido = require("../models/Pedidos");
//const Productopedido = require("../models/ProductosPedidos");
//const Producto = require("../models/Productos");
const { Pedido, Productopedido, Producto } = require("../models/associations");

const pedidosIsAdmin = async (req, res, next) => {
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
        const pedidosUsuario = await Pedido.findAll({
          where: { usuarioId: decodedUser.id },
          include: [
            {
              model: Productopedido,
              as: "productoPedido",
              include: { model: Producto, as: "producto" },
            },
          ],
        });
        /*
        const pedidoUsuario = await Pedido.findByPk({
          where: { usuarioId: userFromToken.id },
        });
        const detallePedido = await Productopedido.findByPk(pedidoUsuario.id);
        const productos = await Producto.findByPk(detallePedido.id);*/
        return res.status(200).json({ status: 200, pedidosUsuario });
      }
    } catch (error) {
      res.status(400).json({
        status: 400,
        mensaje: error,
      });
    }
  }
};
const validarDatosPedido = async (req, res, next) => {
  console.log("validando datos del pedido");
  const { productos, direccion } = req.body;
  if (!productos || !direccion) {
    res.status(400).json({
      mensaje: "Datos incompletos",
    });
  } else next();
};
module.exports = { pedidosIsAdmin, validarDatosPedido };
