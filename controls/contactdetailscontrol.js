// controllers/contactDetailsController.js
const { handleAsyncError } = require('../utils/crudutil');
const ContactDetailsService = require('../service/contactDetails');

const createContactDetails = handleAsyncError(async (req, res) => {
    const { email, mobile, user_id } = req.body;

    if (!email || !mobile || !user_id) {
        return res.status(400).json({ success: false, error: 'Email, mobile, and user_id are required.' });
    }

    try {
        const contactDetails = await ContactDetailsService.createContactDetails({ email, mobile, user_id });
        return res.status(201).json({ success: true, contactDetails });
    } catch (error) {
        console.error('Error creating contact details:', error.message);
        return res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

const getContactDetailsById = handleAsyncError(async (req, res) => {
    const { id } = req.body;

    try {
        const { success, contactDetails, error } = await ContactDetailsService.getContactDetailsById(id);
        if (!success) {
            return res.status(404).json({ success: false, error });
        }
        return res.status(200).json({ success: true, contactDetails });
    } catch (error) {
        console.error('Error getting contact details by ID:', error.message);
        return res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

module.exports = { createContactDetails, getContactDetailsById };
