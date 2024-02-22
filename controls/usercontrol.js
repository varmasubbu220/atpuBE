// controllers/userControl/userCrud.js
const { handleAsyncError } = require('../utils/crudutil');
const AtpUserService = require('../service/userservice');
const { hashPassword , comparePassword} = require('../utils/hashing'); 
const { createToken,decodeToken } = require('../utils/jwt');
const Mailer = require('../utils/mail');
const createUser = handleAsyncError(async (req, res) => {
    const { email, password, name } = req.body;

    // Check if email, password, and name are provided and valid
    if (!email || !password || !name) {
        return res.status(400).json({ success: false, error: 'Email, password, and name are required.' });
    }

    try {
        // Hash the password
        const hashedPassword = await hashPassword(password);

        // Create the user with the hashed password
        const user = await AtpUserService.createUser({ email, password: hashedPassword, name });
        return res.status(201).json({ success: true, user });
    } catch (error) {
        console.error('Error creating user:', error.message);
        return res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

const Login = handleAsyncError(async (req, res) => {
    const { email,password} = req.body;
    if (!email || !password) {
        return res.status(400).json({ success: false, error: 'Email, password are required.' });
    }

    try {
const { success, user, error } = await  AtpUserService.getUserByEmail(email);
if (!success) {
    return res.status(401).json({ success: false, error });
}

const passwordMatch = await comparePassword(password, user.password);
if (!passwordMatch) {
    return res.status(401).json({ success: false, error: 'Incorrect password' });
}


return res.status(200).json({ success: true, user });
    } catch (error) {
        console.error('Error getting user details:', error.message);
        return res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});
const forgotPassword = handleAsyncError(async (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ success: false, error: 'Email is required.' });
    }

    try {
        // Check if the user with the given email exists
        const { success, error } = await AtpUserService.getUserByEmail(email);
        if (!success) {
            return res.status(404).json({ success: false, error: 'User not found.' });
        }
        const token = createToken({ email }, '1h');       
        let mail = {
            text:  `Verification Link: ${process.env.REACT_APP_FRONTEND_URL}/verify?token=${token}`,
            to: email,
            subject:"your verification link",
          };        
         
          await Mailer({...mail})

        return res.status(200).json({ success: true, message: 'Password reset link sent to your email.' });
    } catch (error) {
        console.error('Error processing forgot password:', error.message);
        return res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});
const verifyAndUpdatePassword = handleAsyncError(async (req, res) => {
    const { token, password } = req.body;
    if (!token || !password) {
        return res.status(400).json({ success: false, error: 'Token and password are required.' });
    }

    try {
        const decodedToken = decodeToken(token);
        const email = decodedToken.email;
        if (!email) {
            return res.status(404).json({ success: false, error: 'Invalid token' });
        }

        const { success, user, error } = await AtpUserService.getUserByEmail(email);
        if (!success) {
            return res.status(404).json({ success: false, error: 'User not found.' });
        }
        
        const hashedPassword = await hashPassword(password);

        // Since you're updating the user by email, you need to pass the email as the first argument
        const updateResult = await AtpUserService.updateUser(user.id, { password: hashedPassword });

        if (updateResult.success) {
            return res.status(200).json({ success: true, message: 'Password updated successfully.' });
        } else {
            return res.status(500).json({ success: false, error: 'Failed to update password.' });
        }
    } catch (error) {
        console.error('Error verifying and updating password:', error.message);
        return res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});


module.exports = { Login,createUser,forgotPassword,verifyAndUpdatePassword };
