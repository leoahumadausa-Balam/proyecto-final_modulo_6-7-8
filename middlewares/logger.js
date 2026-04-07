const fs = require('fs');
const path = require('path');

const logger = (req, res, next) => {
    const date = new Date();
    // Formato de fecha y hora local
    const timestamp = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
    const logEntry = `[${timestamp}] Acceso a ruta: ${req.url}\n`;

    // Resolvemos la ruta absoluta hacia logs/log.txt
    const logPath = path.join(__dirname, '../logs/log.txt');

    fs.appendFile(logPath, logEntry, (err) => {
        if (err) console.error('Error al escribir en el log:', err);
    });

    next(); // Pasa el control a la siguiente función o ruta
};

module.exports = logger;