const { Router } = require('express');
const { createProduct, getProducts, updateProduct, deleteProduct } = require('../controllers/product.controller.js');
const verifyToken = require('../middlewares/verifyToken.js');

const router = Router();

// Rutas CRUD para Productos -> llegan pre-cargadas con /productos
router.post('/', verifyToken, createProduct);        // 🔒 Protegida — solo usuarios autenticados crean
router.get('/', getProducts);                         // Pública — cualquiera puede listar
router.put('/:id', verifyToken, updateProduct);       // 🔒 Protegida con JWT
router.delete('/:id', verifyToken, deleteProduct);    // 🔒 Protegida con JWT

module.exports = router;
