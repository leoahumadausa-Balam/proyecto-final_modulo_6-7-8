const express = require('express');
require('dotenv').config();

const router = require('./routes/index.routes.js');
const logger = require('./middlewares/logger.js');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json()); // Permite a Express leer el req.body en formato JSON (Crítico para POST/PUT)
app.use(logger); // Intercepta peticiones y escribe en log.txt
app.use(express.static('public')); // Sirve archivos estáticos desde /public
app.use('/uploads', express.static('uploads')); // Sirve las imágenes subidas desde /uploads

// Rutas
app.use('/', router);

const { sequelize, dbConnect } = require('./config/db.js');

const server = app.listen(PORT, async () => {
    console.log(`Servidor iniciado en el puerto ${PORT}`);
    // Comprobar la conexión apenas sube el server
    await dbConnect();

    // Sincronizar los modelos con la Base de Datos
    require('./models/index.js'); // Importamos los modelos y sus relaciones
    try {
        await sequelize.sync({ force: false }); // force: false protege los datos existentes al reiniciar
        console.log('✅ Tablas sincronizadas automáticamente con PostgreSQL.');
    } catch (error) {
        console.error('❌ Error al sincronizar las tablas con PostgreSQL:', error);
    }
});

server.on('error', (err) => {
    console.error('Fallo crítico en el servidor:', err);
});