const dotenv = require("dotenv");
const Sequelize= require("sequelize")
dotenv.config({ path: "./config/config.env" });

const db=new Sequelize(process.env.DB_DATABASE,process.env.DB_USER,process.env.DB_PASSWORD,{
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    define:{
        timeStamps:false
    },
    pool:{
        max:5,
        min:0,
        acquire:30000,
        idle:10000
    },
    operatorAliases:false
});

module.exports=db;