const DeliveryAddress = require('../model/deliveryaddress');


const createDeliveryAddress = async ({ name, mobile, pincode, state, city, area, houseNumber, user_id }) => {
  try {
    const deliveryAddress = await DeliveryAddress.create({ name, mobile, pincode, state, city, area, houseNumber, user_id });
    return { success: true, deliveryAddress };
  } catch (error) {
    console.error('Error creating delivery address:', error.message);
    return { success: false, error: error.message };
  }
};

const getDeliveryAddressById = async (id) => {
  try {
    const deliveryAddress = await DeliveryAddress.findByPk(id);
    if (deliveryAddress) {
      return { success: true, deliveryAddress };
    } else {
      return { success: false, error: 'Delivery address not found' };
    }
  } catch (error) {
    console.error('Error getting delivery address by ID:', error.message);
    return { success: false, error: error.message };
  }
};



module.exports = { createDeliveryAddress, getDeliveryAddressById};
