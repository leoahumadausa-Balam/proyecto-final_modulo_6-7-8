const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db.js');

const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    precio: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    tableName: 'productos', // Para que la tabla se llame 'productos' en la BBDD
    timestamps: true
});

module.exports = Product;
