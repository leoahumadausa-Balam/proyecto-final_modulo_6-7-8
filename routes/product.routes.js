const { Router } = require('express');
const { createProduct, getProducts, updateProduct, deleteProduct } = require('../controllers/product.controller.js');

const router = Router();

// Rutas CRUD para Productos -> llegan pre-cargadas con /productos
router.post('/', createProduct);
router.get('/', getProducts);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;
