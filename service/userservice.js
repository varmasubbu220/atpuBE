// userServiceSequelize.js
const Atpuserstable = require('../model/usermodel');

// Create a user
const createUser = async ({ email, password, name }) => {
  try {
    const user = await Atpuserstable.create({ email, password, name });
    return { success: true, user };
  } catch (error) {
    console.error('Error creating user:', error.message);
    return { success: false, error: error.message };
  }
};

// Get a user by their email
const getUserByEmail = async (email) => {
  try {
    const user = await Atpuserstable.findOne({ where: { email } });
    if (user) {
      return { success: true, user };
    } else {
      return { success: false, error: 'User not found' };
    }
  } catch (error) {
    console.error('Error getting user by email:', error.message);
    return { success: false, error: error.message };
  }
};

// Update user information
const updateUser = async (id, data) => {
  try {
    const [rowsUpdated] = await Atpuserstable.update(data, { where: { id } });

    if (rowsUpdated > 0) {
      return { success: true, message: 'User updated successfully.' };
    } else {
      return { success: false, error: 'User not found or data not updated' };
    }
  } catch (error) {
    console.error('Error updating user:', error.message);
    return { success: false, error: error.message };
  }
};




module.exports = { createUser, getUserByEmail, updateUser };
