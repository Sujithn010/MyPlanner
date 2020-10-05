const express = require('express');
const mainController = require('../controllers/index');
const isAuth = require('../middleware/is-Auth');

const router = express.Router();

router.get('/',mainController.getIndex);

router.get('/getStarted',mainController.getStarted);

router.get('/makenotes',isAuth,mainController.makeNotes);

router.get('/todo',isAuth,mainController.getTodo);  

router.get('/scheduleMaker',isAuth,mainController.getScheduleMaker);

module.exports = router;