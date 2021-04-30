const express = require("express");
const route = express.Router();

route.get("/:id", (req, res) => {
  
  res.status(200).json({ status: 200, mensaje: "Pedidos por id" });
});
route.post("/", (req, res) => {
  res.status(200).json({
    status: 200,
    mensaje: "Pedido creado correctamente",
  });
});
route.put("/:id", (req, res) => {
  res.status(200).json({
    status: 200,
    mensaje: "Pedido actualizado correctamente",
  });
});
route.delete("/:id", (req, res) => {
  res.status(200).json({
    status: 200,
    mensaje: "Pedido eliminado  correctamente",
  });
});
module.exports = route;
