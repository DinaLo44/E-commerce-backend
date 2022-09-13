// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
// import our database connection from config.js
const sequelize = require('../config/connection');
const Category = require('./Category');

// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model { }

// set up fields and rules for Product model
Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNule: false,
      primaryKey: true,
      autoIcrement: true,
    },
    product_name: {
      type: DataTypes.STRING,
      allowNule: false,
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNule: false,
      validate: {
        isDecimal: true,
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNule: false,
      defaultValue: 10,
      validate: {
        isNumeric: true,
      },
    category_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Category,
        key: "id",
        }
      }
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product',
  }
);

module.exports = Product;
