const DataTypes = require("sequelize").DataTypes;
const Productopedido = require("./ProductosPedidos");
const Pedido = require("./Pedidos");
const Producto = require("./Productos");
const User = require("./Users");



  Productopedido.belongsTo(Pedido, { foreignKey: "pedidoId" });
  Pedido.hasMany(Productopedido, {
    foreignKey: "pedidoId",
    as: "productoPedido",
  });
  Productopedido.belongsTo(Producto, {
    foreignKey: "productoId",
    as: "producto",
  });
  

  Pedido.belongsTo(User, { foreignKey: "usuarioId" });
  User.hasMany(Pedido, { foreignKey: "usuarioId" });


module.exports={Pedido,Productopedido,Producto}