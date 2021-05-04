const Sequelize = require("sequelize");
const db = require("../config/database");

const Productopedido=db.define("productosPedidos",{
    pedidoId:{
        field:"pedido_id",
        type:Sequelize.INTEGER,
        allowNull:false,
        references: {
            model: 'pedidos',
            key: 'id'
          }
        },
    productoId:{
        field:"producto_id",
        type:Sequelize.INTEGER,
        allowNull:false,
        references:{
            model:"products",
            key:"id"
        }
    },
    cantidad:{
        type:Sequelize.INTEGER,
        allowNull:false,

    },
    
},{
    timestamps: false,
  });

module.exports=Productopedido;