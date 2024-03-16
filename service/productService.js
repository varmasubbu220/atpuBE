const Products = require('../model/productmodel');

const createProduct = async ({ ProductName,ProductID, Price, Image }) => {
  try {
    const product = await Products.create({ ProductName, ProductID, Price, Image });
    return { success: true, product };
  } catch (error) {
    console.error('Error creating product:', error.message);
    return { success: false, error: error.message };
  }
};

const getProductById = async (ProductID) => {
  try {
    const product = await Products.findByPk(ProductID);
    if (product) {
      return { success: true, product };
    } else {
      return { success: false, error: 'Product not found' };
    }
  } catch (error) {
    console.error('Error getting product by ID:', error.message);
    return { success: false, error: error.message };
  }
};

const getAllProducts = async () => {
  try {
    const products = await Products.findAll();
    return { success: true, products };
  } catch (error) {
    console.error('Error getting all products:', error.message);
    return { success: false, error: error.message };
  }
};

module.exports = { createProduct, getProductById, getAllProducts };
