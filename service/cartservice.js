
const Cart = require('../model/cart');

const createCart = async (cartData) => {
    try {
        const cart = await Cart.create(cartData);
        return { success: true, cart };
    } catch (error) {
        console.error('Error creating cart:', error.message);
        return { success: false, error: 'Internal Server Error' };
    }
};
const deleteCartsByFilter = async (filter) => {
    try {
        const deletedCount = await Cart.destroy({ where: filter });
        return { success: true, deletedCount };
    } catch (error) {
        console.error('Error deleting carts by filter:', error.message);
        return { success: false, error: 'Internal Server Error' };
    }
};
const getCartsByFilter = async (filter) => {
    try {
        const carts = await Cart.findAll({ where: filter });
        return { success: true, carts };
    } catch (error) {
        console.error('Error getting carts by filter:', error.message);
        return { success: false, error: 'Internal Server Error' };
    }
};

module.exports = { createCart, getCartsByFilter,deleteCartsByFilter };
