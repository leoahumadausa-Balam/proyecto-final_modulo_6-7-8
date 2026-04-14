const { Sequelize } = require('sequelize');

// Instanciar Sequelize con las variables de entorno
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    logging: false, // Desactivar log SQL si molesta en desarrollo. Se puede poner en true para debugear.
  }
);

// Función requerida por el módulo para validar la conexión y mostrar un Log de éxito
const dbConnect = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexión a la base de datos PostgreSQL establecida con éxito.');
  } catch (error) {
    console.error('❌ Error al intentar conectar a la base de datos:', error);
  }
};

module.exports = { sequelize, dbConnect };
