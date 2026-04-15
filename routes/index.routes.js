const { Router } = require('express'); // Importamos el enrutador de Express
const { getHome, getStatus } = require('../controllers/index.controller.js'); // Importamos los controladores
const userRoutes = require('./user.routes.js');
const productRoutes = require('./product.routes.js');
const authRoutes = require('./auth.routes.js');
const uploadRoutes = require('./upload.routes.js');

const router = Router(); // Inicializamos el enrutador

// Rutas base (Módulo 6)
router.get('/', getHome);
router.get('/status', getStatus);

// Rutas CRUD (Módulo 7)
router.use('/usuarios', userRoutes);
router.use('/productos', productRoutes);

// Rutas Auth y Upload (Módulo 8)
router.use('/auth', authRoutes);
router.use('/upload', uploadRoutes);

module.exports = router; // Exportamos el enrutador para usarlo en index.js