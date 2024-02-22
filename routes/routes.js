const express = require('express');

const router= express.Router();
const {createUser,Login,forgotPassword,verifyAndUpdatePassword}=require('../controls/usercontrol');

//auth routes
router.route('/register').post(createUser)
router.route('/login').post(Login)
router.route('/forgot').post(forgotPassword)
router.route('/verify').post(verifyAndUpdatePassword)


module.exports=router;