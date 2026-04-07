const express = require('express');
require('dotenv').config();

const router = require('./routes/index.routes.js');
const logger = require('./middlewares/logger.js');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(logger); // Intercepta peticiones y escribe en log.txt
app.use(express.static('public')); // Sirve estáticos si la ruta no coincide

// Rutas
app.use('/', router);

const server = app.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto ${PORT}`);
});

server.on('error', (err) => {
    console.error('Fallo crítico en el servidor:', err);
});