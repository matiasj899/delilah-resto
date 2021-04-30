const express = require("express");
const {isAdmin}=require("../middlewares/usersMiddleware")
const validarDatos = require("../middlewares/productosMiddleware");
const {
  productId,
  allProducts,
  addNewproduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productosController.js");
const route = express.Router();

route.get("/:id", productId);
route.get("/", allProducts);
route.post("/",isAdmin, addNewproduct);
route.put("/:id",isAdmin, updateProduct);
route.delete("/:id",isAdmin, deleteProduct);

module.exports = route;
