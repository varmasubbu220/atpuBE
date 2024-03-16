// Import necessary modules
const Products = require('../model/productmodel');
const Cart = require('../model/cart');


const getProductsInUserCart = async (userId) => {
    try {
        const userCartItems = await Cart.findAll({ where: { userId } });
     
        const productIds = userCartItems.map(cartItem => cartItem?.dataValues?.product);
        console.log(productIds, 'dd');

        const productsInCart = await Products.findAll({ where: { ProductID: productIds } });
        console.log(productsInCart)

        return { success: true, products: productsInCart };
    } catch (error) {
        console.error('Error getting products in user cart:', error.message);
        return { success: false, error: 'Internal Server Error' };
    }
};

module.exports = { getProductsInUserCart };
