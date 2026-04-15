const { Router } = require('express');
const { uploadFile } = require('../controllers/upload.controller.js');
const verifyToken = require('../middlewares/verifyToken.js');
const upload = require('../middlewares/upload.js');

const router = Router();

// Ruta protegida: necesita JWT + un archivo de imagen en el campo "imagen"
// verifyToken valida el JWT → upload.single('imagen') procesa el archivo → uploadFile guarda y responde
router.post('/', verifyToken, upload.single('imagen'), uploadFile);

module.exports = router;
