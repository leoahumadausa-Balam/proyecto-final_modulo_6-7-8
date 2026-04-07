const { Router } = require('express'); // Importamos el enrutador de Express
const { getHome, getStatus } = require('../controllers/index.controller.js'); // Importamos los controladores

const router = Router(); // Inicializamos el enrutador

// Definición de las rutas públicas solicitadas
router.get('/', getHome); // Ruta raíz que devolverá el HTML
router.get('/status', getStatus); // Ruta de estado que devolverá un JSON

module.exports = router; // Exportamos el enrutador para usarlo en index.js