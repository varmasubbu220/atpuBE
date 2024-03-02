const ContactDetails = require('../model/contactdetails');

const createContactDetails = async ({ email, mobile, user_id }) => {
  try {
    const contactDetails = await ContactDetails.create({ email, mobile, user_id });
    return { success: true, contactDetails };
  } catch (error) {
    console.error('Error creating contact details:', error.message);
    return { success: false, error: error.message };
  }
};

const getContactDetailsById = async (id) => {
  try {
    const contactDetails = await ContactDetails.findByPk(id);
    if (contactDetails) {
      return { success: true, contactDetails };
    } else {
      return { success: false, error: 'Contact details not found' };
    }
  } catch (error) {
    console.error('Error getting contact details by ID:', error.message);
    return { success: false, error: error.message };
  }
};

module.exports = { createContactDetails, getContactDetailsById };
