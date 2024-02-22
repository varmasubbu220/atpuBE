// models/atpuserstable.model.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../connections/sequilize');

const Atpuserstable = sequelize.define('atpuserstable', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  modifieddate: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'atpuserstable',
  timestamps: false,
});

module.exports = Atpuserstable;
