const path = require('path'); // Módulo nativo para manejar rutas de archivos

// Controlador para la ruta raíz (/)
const getHome = (req, res) => {
    // Sirve el archivo estático HTML resolviendo la ruta absoluta
    res.sendFile(path.join(__dirname, '../public/index.html'));
};

// Controlador para la ruta de estado (/status)
const getStatus = (req, res) => {
    // Devuelve una respuesta en formato JSON con la información del servidor
    res.json({
        status: 'success',
        message: 'Servidor Express operando correctamente',
        timestamp: new Date().toISOString()
    });
};

module.exports = {
    getHome,
    getStatus
};