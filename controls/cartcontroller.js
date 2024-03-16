
const { handleAsyncError } = require('../utils/crudutil');
const { createCart, deleteCartsByFilter} = require('../service/cartservice');
const {getProductsInUserCart} = require('../service/getcart')

const addCart = handleAsyncError(async (req, res) => {
    const cartData = req.body;

    try {
        const { success, cart, error } = await createCart(cartData);
        if (!success) {
            return res.status(500).json({ success: false, error });
        }
        return res.status(201).json({ success: true, cart });
    } catch (error) {
        console.error('Error creating cart:', error.message);
        return res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});
const deleteCartsByFilterController = async (req, res) => {
    try {
        const filter = req.body.filter; 
        const result = await deleteCartsByFilter(filter);

        if (result.success) {
            return res.status(200).json({ message: 'Cart items deleted successfully', deletedCount: result.deletedCount });
        } else {
            return res.status(500).json({ error: result.error });
        }
    } catch (error) {
        console.error('Error deleting carts by filter:', error.message);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
const getCarts = handleAsyncError(async (req, res) => {
    const {userId} = req.body; 

    try {
        const { success, products, error } = await getProductsInUserCart(userId);
        if (!success) {
            return res.status(500).json({ success: false, error });
        }
        return res.status(200).json({ success: true, products });
    } catch (error) {
        console.error('Error getting carts:', error.message);
        return res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

module.exports = { addCart, getCarts,deleteCartsByFilterController };
