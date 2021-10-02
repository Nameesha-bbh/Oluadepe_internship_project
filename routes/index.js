const express = require('express');
const router = express.Router();
const indexController =  require('../controllers/index');
const { check, body } = require('express-validator');
const User = require('../models/user');

router.get('/',indexController.indexSignup);

router.post('/',[
    check('email')
      .isEmail()
      .withMessage('Please enter a valid email.')
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then(userDoc => {
          if (userDoc) {
            return Promise.reject(
              'E-Mail exists already, please pick a different one.'
            );
          }
        });
      }),
    body(
      'password',
      'Please enter a password with only numbers and text and at least 5 characters.'
    )
      .isLength({ min: 5 })
      .isAlphanumeric(),
    body('confirmpassword')
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error('Passwords have to match!');
        }
        return true;
      })
],indexController.indexPost);


router.get('/send',indexController.getSendEmail);

router.post('/send',[
    body('email','Please enter valid email address')
      .notEmpty(),
    body('message','Please donot leave the body of the message empty')
      .notEmpty(),
],indexController.postSendEmail);

module.exports = router;