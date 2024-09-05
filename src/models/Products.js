const { DataTypes } = require("sequelize");
const sequelize = require("../config/config");

const Products = sequelize.define('product', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    preco: {
        type: DataTypes.STRING,
        allowNull: false
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false
    }
});


module.exports = Products;