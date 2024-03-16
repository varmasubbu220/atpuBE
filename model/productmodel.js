// models/product.model.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../connections/sequilize');

const Products = sequelize.define('Products', {
  ProductID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  ProductName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  Image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  tableName: 'Products',
  timestamps: false,
});

module.exports = Products;
