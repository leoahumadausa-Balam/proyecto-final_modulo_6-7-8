const { User } = require('../models');

// CREATE
const createUser = async (req, res) => {
    try {
        const { nombre, email, password, rol } = req.body;
        const newUser = await User.create({ nombre, email, password, rol });
        res.status(201).json({ status: 'success', message: 'Usuario creado exitosamente', data: newUser });
    } catch (error) {
        res.status(400).json({ status: 'error', message: 'Error al crear usuario', data: error.message });
    }
};

// READ ALL
const getUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json({ status: 'success', message: 'Usuarios obtenidos', data: users });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Error al obtener usuarios', data: error.message });
    }
};

// UPDATE
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, rol } = req.body; // Evitamos actualizar email y password por seguridad simple
        const user = await User.findByPk(id);
        if (!user) return res.status(404).json({ status: 'error', message: 'Usuario no encontrado', data: null });
        
        await user.update({ nombre, rol });
        res.status(200).json({ status: 'success', message: 'Usuario actualizado', data: user });
    } catch (error) {
        res.status(400).json({ status: 'error', message: 'Error al actualizar', data: error.message });
    }
};

// DELETE
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);
        if (!user) return res.status(404).json({ status: 'error', message: 'Usuario no encontrado', data: null });

        await user.destroy();
        res.status(200).json({ status: 'success', message: 'Usuario eliminado exitosamente', data: null });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Error al eliminar', data: error.message });
    }
};

module.exports = { createUser, getUsers, updateUser, deleteUser };
