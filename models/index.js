const User = require('./User');
const Product = require('./Product');

// 1 Usuario puede tener/crear N Productos
User.hasMany(Product, {
    foreignKey: 'usuarioId',
    sourceKey: 'id',
    as: 'productos' // Alias para las consultas
});

// N Productos pertenecen a 1 Usuario
Product.belongsTo(User, {
    foreignKey: 'usuarioId',
    targetKey: 'id',
    as: 'propietario' // Alias
});

module.exports = {
    User,
    Product
};
