// models/contactDetails.model.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../connections/sequilize');
const Atpuserstable = require('./usermodel');

const ContactDetails = sequelize.define('ContactDetails', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  mobile: {
    type: DataTypes.STRING,
    allowNull: false,
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
  tableName: 'contact_details',
  timestamps: false,
});

module.exports = ContactDetails;
