const User = require("../models/Users");
const jwt = require("jsonwebtoken");
const pedidosService = require("../services/pedidosService");
/*const Pedido = require("../models/Pedidos");
const Productopedido = require("../models/ProductosPedidos");
const Producto = require("../models/Productos");*/

const { Pedido, Productopedido, Producto } = require("../models/associations");

/*
Productopedido.belongsTo(Pedido, { foreignKey: "pedidoId" });
Pedido.hasMany(Productopedido, {
  foreignKey: "pedidoId",
  as: "productoPedido",
});
Productopedido.belongsTo(Producto, {
  foreignKey: "productoId",
  as: "producto",
});
*/
const getPedidos = async (req, res) => {
  try {
    const pedidos = await Productopedido.findAll(
      {
        include: [{ model: Producto, as: "producto" }, { model: Pedido }],
      }

      /*{
      include: [{ model: Productopedido, as: "productoPedido" }],
    }*/
    );

    if (pedidos) {
      res.status(200).json({
        status: 200,
        mensaje: "Devolviendo todos los pedidos ",
        pedidos,
      });
    } else throw new Error("No se encontraron los pedidos");
  } catch (error) {
    res.status(400).json({
      status: 400,
      mensaje: error.message,
    });
  }
};
const crearPedido = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  if (token && token.startsWith("Bearer ")) {
    token = token.slice(7, token.length);
  }
  if (token) {
    try {
      const decodedUser = jwt.verify(token, process.env.JWT_SECRET_WORD);

      const userFromToken = await User.findByPk(decodedUser.id);
      const pedido = await pedidosService.crear(userFromToken.id, req.body);
      if (pedido) {
        const detallePedido = await pedidosService.detalle(req.body, pedido);
        if (detallePedido.length > 0) {
          res.status(200).json({
            Pedido,
            detallePedido,
          });
        } else {
          res.status(400).json({
            error: "No se ha podido procesar el pedido",
          });
        }
      } else {
        res.status(400).json({
          error: "No se ha podido procesar el pedido",
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
};

const actualizarPedido = async (req, res) => {
  const pedido = await Pedido.findByPk(req.params.id);
  if (pedido) {
    try {
      await Pedido.update(
        {
          estado: req.body.estado,
        },
        { where: { id: req.params.id } }
      );
      return res.status(200).json({
        status: 200,
        mensaje: "Pedido actualizado correctamente",
      });
    } catch (error) {
      res.status(400).json({
        error,
      });
    }
  } else {
    res.status(400).json({
      status: 400,
      mensaje: "Pedido inexistente",
    });
  }
};
const eliminarPedido = async (req, res) => {
  const pedidoDetalleEliminar = await Productopedido.findOne({
    where: { pedidoId: req.params.id },
  });
  const pedidoEliminar = await Pedido.findByPk(req.params.id);
  if (pedidoDetalleEliminar && pedidoEliminar) {
    try {
      await Productopedido.destroy({
        where: { pedidoId: req.params.id },
      });
      await Pedido.destroy({ where: { id: req.params.id } });
      res.status(200).json({
        status: 200,
        mensaje: "Pedido eliminado correctamente.",
      });
    } catch (error) {
      res.status(400).json({
        status: 400,
        error,
      });
    }
  } else {
    res.status(400).json({
      status: 400,
      mensaje: "Pedido inexistente",
    });
  }
};
module.exports = { getPedidos, crearPedido, actualizarPedido, eliminarPedido };
