// controllers/productController/productCrud.js
const { handleAsyncError } = require('../utils/crudutil');
const ProductService = require('../service/productService');
const { v4: uuidv4 } = require('uuid');
const createProduct = handleAsyncError(async (req, res) => {
    const { ProductName, Price, Image } = req.body;

    if (!ProductName || !Price || !Image) {
        return res.status(400).json({ success: false, error: 'ProductName,Price, image src are required.' });
    }

    try {
        const ProductID =uuidv4().slice(0,9);
        
        const product = await ProductService.createProduct({ProductID, ProductName, Price, Image });
        return res.status(201).json({ success: true, product });
    } catch (error) {
        console.error('Error creating product:', error.message);
        return res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

const getProductById = handleAsyncError(async (req, res) => {
    const { ProductID } = req.params;
if(!ProductID){
    return res.status(400).json({ success: false, error: 'ProductId is required.' });
}
    try {
        const { success, product, error } = await ProductService.getProductById(ProductID);
        if (!success) {
            return res.status(404).json({ success: false, error });
        }
        return res.status(200).json({ success: true, product });
    } catch (error) {
        console.error('Error getting product by ID:', error.message);
        return res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

const getAllProducts = handleAsyncError(async (req, res) => {
    try {
        const { success, products, error } = await ProductService.getAllProducts();
        if (!success) {
            return res.status(500).json({ success: false, error });
        }
        return res.status(200).json({ success: true, products });
    } catch (error) {
        console.error('Error getting all products:', error.message);
        return res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

module.exports = { createProduct, getProductById, getAllProducts };
