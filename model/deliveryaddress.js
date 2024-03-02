// models/your_model_name.model.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../connections/sequilize');
const Atpuserstable = require('./usermodel');

const DeliveryAddress = sequelize.define('DeliveryAddress', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  mobile: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  pincode: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  state: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  area: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  houseNumber: {
    type: DataTypes.STRING,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Atpuserstable,
      key: 'id',
    }
  },
}, {
  tableName: 'DeliveryAddress',
  timestamps: false,
});

module.exports = DeliveryAddress;
