// controllers/deliveryAddressControl/deliveryAddressCrud.js
const { handleAsyncError } = require('../utils/crudutil');
const DeliveryAddressService = require('../service/deliveryAddress');

const createDeliveryAddress = handleAsyncError(async (req, res) => {
    const { name, mobile, pincode, state, city, area, houseNumber, user_id } = req.body;

    if (!name || !mobile || !pincode || !state || !city || !area || !user_id) {
        return res.status(400).json({ success: false, error: 'name, mobile, pincode, state, city, area, and userId are required.' });
    }

    try {
        const deliveryAddress = await DeliveryAddressService.createDeliveryAddress({ name, mobile, pincode, state, city, area, houseNumber, user_id });
        return res.status(201).json({ success: true, deliveryAddress });
    } catch (error) {
        console.error('Error creating delivery address:', error.message);
        return res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});


const getDeliveryAddressById = handleAsyncError(async (req, res) => {
    const { id } = req.body;

    try {
        const { success, deliveryAddress, error } = await DeliveryAddressService.getDeliveryAddressById(id);
        if (!success) {
            return res.status(404).json({ success: false, error });
        }
        return res.status(200).json({ success: true, deliveryAddress });
    } catch (error) {
        console.error('Error getting delivery address by ID:', error.message);
        return res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});



module.exports = { createDeliveryAddress, getDeliveryAddressById};
