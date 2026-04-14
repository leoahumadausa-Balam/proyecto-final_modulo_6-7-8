const { Router } = require('express');
const { createUser, getUsers, updateUser, deleteUser } = require('../controllers/user.controller.js');

const router = Router();

// Rutas CRUD para Usuarios -> llegan pre-cargadas con /usuarios
router.post('/', createUser);
router.get('/', getUsers);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;
