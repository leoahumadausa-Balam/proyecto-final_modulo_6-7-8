const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

// REGISTRO — Crea un usuario nuevo con la contraseña encriptada
const register = async (req, res) => {
    try {
        const { nombre, email, password, rol } = req.body;

        // Verificamos si el email ya está registrado
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({
                status: 'error',
                message: 'El email ya está registrado.',
                data: null
            });
        }

        // Encriptamos la contraseña antes de guardarla (salt rounds = 10)
        const hashedPassword = await bcrypt.hash(password, 10);

        // Creamos el usuario con la contraseña encriptada
        const newUser = await User.create({
            nombre,
            email,
            password: hashedPassword,
            rol
        });

        res.status(201).json({
            status: 'success',
            message: 'Usuario registrado exitosamente.',
            data: { id: newUser.id, nombre: newUser.nombre, email: newUser.email, rol: newUser.rol }
        });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Error al registrar usuario.', data: error.message });
    }
};

// LOGIN — Verifica credenciales y devuelve un token JWT
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Buscamos al usuario por email
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ status: 'error', message: 'Credenciales inválidas.', data: null });
        }

        // Comparamos la contraseña ingresada con el hash almacenado
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ status: 'error', message: 'Credenciales inválidas.', data: null });
        }

        // Generamos el JWT con datos básicos del usuario y expira en 24 horas
        const token = jwt.sign(
            { id: user.id, email: user.email, rol: user.rol },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.status(200).json({
            status: 'success',
            message: 'Login exitoso.',
            data: { token, usuario: { id: user.id, nombre: user.nombre, email: user.email, rol: user.rol } }
        });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Error en el login.', data: error.message });
    }
};

module.exports = { register, login };
