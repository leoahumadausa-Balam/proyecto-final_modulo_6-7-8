const { Product } = require('../models');
const { Op } = require('sequelize');

// CREATE
const createProduct = async (req, res) => {
    try {
        const { nombre, precio, descripcion, usuarioId } = req.body;
        const newProduct = await Product.create({ nombre, precio, descripcion, usuarioId });
        res.status(201).json({ status: 'success', message: 'Producto creado', data: newProduct });
    } catch (error) {
        res.status(400).json({ status: 'error', message: 'Error al crear producto', data: error.message });
    }
};

// READ ALL (Con filtro dinámico usando query params)
const getProducts = async (req, res) => {
    try {
        const { nombre } = req.query; // Busca en la URL algo como ?nombre=zapatos
        let filtro = {};
        
        if (nombre) {
            // Utilizamos el operador iLike de postgres para buscar coincidencias parciales sin importar mayúsculas
            filtro = { nombre: { [Op.iLike]: `%${nombre}%` } }; 
        }

        const products = await Product.findAll({ where: filtro });
        res.status(200).json({ status: 'success', message: 'Productos obtenidos', data: products });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Error al obtener productos', data: error.message });
    }
};

// UPDATE
const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, precio, descripcion } = req.body;
        const product = await Product.findByPk(id);
        if (!product) return res.status(404).json({ status: 'error', message: 'Producto no encontrado', data: null });
        
        await product.update({ nombre, precio, descripcion });
        res.status(200).json({ status: 'success', message: 'Producto actualizado', data: product });
    } catch (error) {
        res.status(400).json({ status: 'error', message: 'Error al actualizar', data: error.message });
    }
};

// DELETE
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByPk(id);
        if (!product) return res.status(404).json({ status: 'error', message: 'Producto no encontrado', data: null });

        await product.destroy();
        res.status(200).json({ status: 'success', message: 'Producto eliminado', data: null });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Error al eliminar', data: error.message });
    }
};

module.exports = { createProduct, getProducts, updateProduct, deleteProduct };
