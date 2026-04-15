const { Router } = require('express');
const { register, login } = require('../controllers/auth.controller.js');

const router = Router();

// Ruta pública de registro de usuario nuevo
router.post('/register', register);

// Ruta pública de login — devuelve el JWT al cliente
router.post('/login', login);

module.exports = router;
