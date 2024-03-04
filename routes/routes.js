const express = require('express');

const router= express.Router();
const {createUser,Login,forgotPassword,verifyAndUpdatePassword}=require('../controls/usercontrol');
const {createDeliveryAddress,getDeliveryAddressById}=require('../controls/addresscontroller')
const {createContactDetails,getContactDetailsById}=require('../controls/contactdetailscontrol')
const sendmail=require('../controls/sendMail')
const {MakeOrder}=require('../controls/payment')
router.route('/makeorder').post(MakeOrder)
//auth routes
router.route('/register').post(createUser)
router.route('/login').post(Login)
router.route('/forgot').post(forgotPassword)
router.route('/verify').post(verifyAndUpdatePassword)
//deliver Address
router.route('/address').post(createDeliveryAddress)
router.route('/getaddress').post(getDeliveryAddressById);
//contact details
router.route('/contact').post(createContactDetails)
router.route('/getcontacts').post(getContactDetailsById)
router.route('/mail').post(sendmail)


module.exports=router;