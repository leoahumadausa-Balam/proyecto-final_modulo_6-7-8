const { Router } = require('express'); // Importamos el enrutador de Express
const { getHome, getStatus } = require('../controllers/index.controller.js'); // Importamos los controladores
const userRoutes = require('./user.routes.js');
const productRoutes = require('./product.routes.js');

const router = Router(); // Inicializamos el enrutador

// Rutas base (Paso 1)
router.get('/', getHome);
router.get('/status', getStatus);

// Rutas CRUD completas (Paso 3)
router.use('/usuarios', userRoutes);
router.use('/productos', productRoutes);

module.exports = router; // Exportamos el enrutador para usarlo en index.js