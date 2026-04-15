const { Router } = require('express');
const { createUser, getUsers, updateUser, deleteUser } = require('../controllers/user.controller.js');
const verifyToken = require('../middlewares/verifyToken.js');

const router = Router();

// Rutas CRUD para Usuarios -> llegan pre-cargadas con /usuarios
router.post('/', createUser);              // Pública — cualquiera puede registrarse
router.get('/', getUsers);                 // Pública — listar usuarios
router.put('/:id', verifyToken, updateUser);    // 🔒 Protegida con JWT
router.delete('/:id', verifyToken, deleteUser); // 🔒 Protegida con JWT

module.exports = router;
