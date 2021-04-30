const Producto = require("../models/Productos");

//BUSCAR PRODUCTO POR ID
const productId = async (req, res) => {
  try {
    const productos = await Producto.findByPk(req.params.id);
    if (productos) {
      res.status(200).json({
        status: 200,
        mensaje: "Devolviendo productos por id",
        productos: productos,
      });
    } else throw new Error("No se encontro el producto");
  } catch (error) {
    res.status(400).json({
      status: 400,
      mensaje: error.message,
    });
  }
};
//BUSCAR TODOS LOS PRODUCTOS
const allProducts = async (req, res) => {
  try {
    const productos = await Producto.findAll();
    if (productos) {
      res.status(200).json({
        status: 200,
        mensaje: "Devolviendo todos los productos ",
        productos: productos,
      });
    } else throw new Error("No se encontraron los producos");
  } catch (error) {
    res.status(400).json({
      status: 400,
      mensaje: error.message,
    });
  }
};
//CREAR PRODUCTO
const addNewproduct = async (req, res) => {
  try {
    const newProduct = await Producto.create(req.body);
    if (newProduct) {
      res.status(200).json({
        status: 200,
        mensaje: "Producto agregado satisfactoriamente ",
        producto: newProduct,
      });
    } else throw new Error("No se ha podido agregar el producto");
  } catch (error) {
    res.status(400).json({
      status: 400,
      mensaje: error.message,
    });
  }
};
//ACTUALIZAR PRODUCTO
const updateProduct = async (req, res) => {
  const product = await Producto.findByPk(req.params.id);
  if (product) {
    try {
      await Producto.update(
        {
          name: req.body.name,
          price: req.body.price,
          img: req.body.img,
        },
        { where: { id: req.params.id } }
      );
      res.status(200).json({
        status: 200,
        mensaje: "Producto actualizado",
      });
    } catch (error) {
      res.status(400).json({
        status: 400,
        mensaje: error.message,
      });
    }
  } else {
    res.status(400).json({
      status: 400,
      mensaje: "No se ha encontrado el producto",
    });
  }
};
//ELIMINAR PRODUCTO
const deleteProduct = async (req, res) => {
  const product = await Producto.findByPk(req.params.id);
  if (product) {
    try {
      await Producto.destroy({ where: { id: req.params.id } });
      res.status(200).json({
        status: 200,
        mensaje: "Producto eliminado",
      });
    } catch (error) {
      res.status(400).json({
        status: 200,
        mensaje: "No se pudo eliminar el producto",
      });
    }
  } else {
    res.status(400).json({
      status: 400,
      mensaje: "No se pudo encontrar el producto",
    });
  }
};

module.exports = {
  productId,
  allProducts,
  addNewproduct,
  updateProduct,
  deleteProduct,
};
