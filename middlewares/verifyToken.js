const jwt = require('jsonwebtoken');

// Middleware que verifica si la petición trae un token JWT válido
const verifyToken = (req, res, next) => {
    // Leemos el header Authorization que debe venir como: "Bearer <token>"
    const authHeader = req.headers['authorization'];

    // Si no hay header de autorización, rechazamos con 401
    if (!authHeader) {
        return res.status(401).json({
            status: 'error',
            message: 'Acceso denegado. No se proporcionó token de autenticación.',
            data: null
        });
    }

    // El header tiene formato "Bearer <token>", separamos y tomamos el token
    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({
            status: 'error',
            message: 'Formato de token inválido. Use: Bearer <token>',
            data: null
        });
    }

    try {
        // Verificamos el token con la clave secreta del .env
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Si es válido, adjuntamos los datos del usuario al request para usarlos luego
        req.usuario = decoded;
        next(); // Dejamos pasar la petición al controlador
    } catch (error) {
        return res.status(403).json({
            status: 'error',
            message: 'Token inválido o expirado.',
            data: null
        });
    }
};

module.exports = verifyToken;
