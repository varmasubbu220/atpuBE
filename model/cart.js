// models/cart.model.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../connections/sequilize');
const Atpuserstable = require('./usermodel');
const Products = require('./productmodel');

const Cart = sequelize.define('Cart', {
  cart_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userid: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Atpuserstable,
      key: 'id',
    }
  },
  product: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Products,
      key: 'ProductID',
    }
  },
}, {
  tableName: 'carts',
  timestamps: false,
});

module.exports = Cart;
