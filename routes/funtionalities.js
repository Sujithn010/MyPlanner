const express = require('express');
const {check,body} = require('express-validator');
const funcController = require('../controllers/functionalities');
const isAuth = require('../middleware/is-Auth');
const router = express.Router();

router.post('/submitNotes', isAuth,
[
        body('title','Please enter a title that has a minimum length of 3')
            .isString()
            .isLength({min:3})
            .trim(),
        body('description','Please enter a description that has a minimum length of 5')
            .isString()
            .isLength({min:5})
            .trim(),
        body('content','Please enter some content in your notes')
            .notEmpty()
            .isString()
            .trim()
],funcController.postNotes);

router.get('/viewNotes',isAuth,funcController.getNotes);

router.delete('/deleteNote/:noteId',isAuth,funcController.deleteNote);

router.post('/submitTodo',isAuth,express.json({type: '*/*'}),funcController.postTodo);

router.get('/viewtodoLists',isAuth,funcController.getTodoLists);

router.delete('/deleteTodoList/:listId',isAuth,funcController.deleteTodoList);

router.post('/submitSchedule',isAuth,express.json({type: '*/*'}),funcController.postSchedule);

router.get('/viewSchedule',isAuth,funcController.getSchedule);

router.delete('/deleteSchedule/:schId',isAuth,funcController.deleteSchedule);

module.exports = router;