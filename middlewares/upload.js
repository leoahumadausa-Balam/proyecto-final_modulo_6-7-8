const multer = require('multer');
const path = require('path');

// Configuración del almacenamiento: dónde y cómo guardar los archivos
const storage = multer.diskStorage({
    // Los archivos se guardan en la carpeta /uploads de la raíz del proyecto
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    // El nombre del archivo será: timestamp + nombre original para evitar duplicados
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueName);
    }
});

// Filtro: solo aceptamos imágenes jpg, jpeg y png
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
        cb(null, true); // Aceptar el archivo
    } else {
        cb(new Error('Solo se aceptan imágenes en formato JPG o PNG.'));
    }
};

// Instancia final de multer con almacenamiento, filtro y límite de 2MB
const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 2 * 1024 * 1024 } // 2 MB en bytes
});

module.exports = upload;
