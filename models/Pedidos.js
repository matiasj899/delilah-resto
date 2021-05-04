const Sequelize = require("sequelize");
const db = require("../config/database");

const Pedido = db.define(
  "pedidos",
  {
    usuarioId: {
      field: "usuario_id",
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
    pago: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
    estado: {
      type: Sequelize.ENUM(
        "nuevo",
        "confirmado",
        "preparando",
        "enviando",
        "entregado"
      ),
      allowNull: false,
      defaultValue: "nuevo",
    },
    hora: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    direccion: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Pedido;
