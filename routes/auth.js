const express = require('express');
const {body} = require('express-validator');
const authController = require('../controllers/auth');

const router = express.Router();

router.get('/login',authController.getLogin);

router.post('/login',authController.postLogin);

router.get('/signup',authController.getSignup);

router.post('/signup',
[
    body('email')
    .isEmail()
    .trim()
]
,authController.postSignup);

router.get('/logout',authController.getLogout);

module.exports = router;