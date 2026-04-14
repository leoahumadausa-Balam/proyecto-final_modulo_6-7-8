const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db.js');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    rol: {
        type: DataTypes.STRING,
        defaultValue: 'user'
    }
}, {
    tableName: 'usuarios', // Para que la tabla se llame 'usuarios' en la BBDD
    timestamps: true
});

module.exports = User;
