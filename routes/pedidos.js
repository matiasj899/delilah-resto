const express = require("express");
const route = express.Router();
const {
  pedidosIsAdmin,
  validarDatosPedido,
} = require("../middlewares/pedidosMiddleware");
const { userData, isAdmin } = require("../middlewares/usersMiddleware");
const {
  getPedidos,
  crearPedido,
  actualizarPedido,
  eliminarPedido,
} = require("../controllers/pedidosController");

route.get("/", pedidosIsAdmin, getPedidos);

route.post("/", validarDatosPedido, crearPedido);

route.put("/:id", isAdmin, actualizarPedido);

route.delete("/:id", isAdmin, eliminarPedido);
module.exports = route;
