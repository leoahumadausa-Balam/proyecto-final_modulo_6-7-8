const { Sequelize } = require('sequelize');
require('dotenv').config();

// Inicializamos la conexión a la base de datos con las variables de entorno
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'postgres',
        port: process.env.DB_PORT || 5432,
        logging: false, // Puedes cambiar a console.log para ver las consultas SQL en terminal
    }
);

module.exports = sequelize;
