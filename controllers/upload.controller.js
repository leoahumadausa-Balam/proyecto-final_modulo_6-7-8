const { User } = require('../models');

// Controlador que procesa la imagen subida y la asocia al usuario autenticado
const uploadFile = async (req, res) => {
    try {
        // Si Multer no encontró ningún archivo, respondemos con error
        if (!req.file) {
            return res.status(400).json({
                status: 'error',
                message: 'No se proporcionó ningún archivo.',
                data: null
            });
        }

        // La ruta donde quedó guardado el archivo (por ej: uploads/1234567890-foto.jpg)
        const filePath = `uploads/${req.file.filename}`;

        // PLUS: Actualizamos el campo "foto" del usuario autenticado en la BD
        // req.usuario viene del middleware verifyToken (contiene el id del usuario)
        await User.update(
            { foto: filePath },
            { where: { id: req.usuario.id } }
        );

        res.status(200).json({
            status: 'success',
            message: 'Archivo subido exitosamente y asociado al usuario.',
            data: {
                filename: req.file.filename,
                path: filePath,
                size: `${(req.file.size / 1024).toFixed(2)} KB`
            }
        });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Error al subir el archivo.', data: error.message });
    }
};

module.exports = { uploadFile };
