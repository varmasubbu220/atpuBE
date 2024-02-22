const jwt = require('jsonwebtoken');
require('dotenv').config();
const createToken = (payload, expiresIn) => {
 
    const token = jwt.sign(payload,process.env.jwtToken, { expiresIn });
    return token;
  };
const decodeToken = (token) => {
  try {
   const decoded = jwt.verify(token,process.env.jwtToken);
    return decoded;
  } catch (error) {
    return null; 
  }
};

module.exports = { createToken, decodeToken };
