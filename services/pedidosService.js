const { Pedido} = require("../models/associations");
const Productopedido=require("../models/ProductosPedidos")
const crear = async (userID, reqBody) => {
  const hora = new Date();
  let pago = [];
  const reducer = (acumulator, currentValue) => acumulator + currentValue;

  const productos = reqBody.productos;
  productos.forEach((producto) => {
    const total = producto.cantidad * producto.precio;
    pago.push(total);
  });

  const pagoTotal = pago.reduce(reducer);

  const nuevoPedido = await Pedido.create({
    usuarioId: userID,
    pago: pagoTotal,
    hora,
    direccion: reqBody.direccion,
  });
  return nuevoPedido;
};

const detalle = async (reqBody, pedido) => {
  const { productos } = await reqBody;
  
  for (const producto of productos) {
      const pedidoId=pedido.id
      const productoId= producto.producto_id;
      const productoCantidad=producto.cantidad;

      const pedidoFinal=await Productopedido.create({
          pedidoId,
          productoId,
          cantidad:productoCantidad
      })
      
  }
  return "detalle creado."
};
module.exports = { crear, detalle };
