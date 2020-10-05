const {validationResult} = require('express-validator/check');
const sanitize = require('../util/sanitize');
const Notes = require('../models/Notes');
const Todos = require('../models/Todos');
const User = require('../models/User');
const Schedule = require('../models/Schedule');

exports.postNotes = (req,res,next) => {
    console.log(req.body);
    let title = req.body.title;
    title = sanitize(title);
    let description = req.body.description;
    description = sanitize(description);
    let content = req.body.content;
    content = sanitize(content);
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).render('makenotes', {
          isAuthenticated: req.session.isLoggedIn,
          notes: {
            title:title, 
            description: description,
            content: content
          },
          hasError:true,
          errorMessage: errors.array()[0].msg,
          validationErrors: errors.array()
        });
      }
    const notes = new Notes({
        title: title,
        description:description,
        content:content,
        userId: req.user
    })
    notes.save()
        .then(result=>{
            console.log(result);
            console.log('Notes saved');
            res.redirect('viewNotes');
        })
        .catch(err=>{
            console.log(err);
        })
}

exports.getNotes = (req,res,next) => {
    Notes.find({userId:req.user._id})
        .then(notes=>{
            res.render('viewNotes',{
                notes:notes,
                isAuthenticated: req.session.isLoggedIn
            })
        })
        .catch(err=>{
            console.log(err);
        })
}

exports.deleteNote = (req, res, next) => {
    const noteId = req.params.noteId;
    console.log(noteId);
    Notes.findById(noteId)
      .then(note=>{
        if(!note){
          return new Error('Notes not found');
        }
        return Notes.deleteOne({_id:noteId,userId:req.user._id})
      })
      .then(() => {
        console.log('deleted');
        res.status(200).json({message:'Success'});
      })
      .catch(err => {
        res.status(500).json({message:'Deletion Failed'});
      });
  };

exports.postTodo = (req,res,next) => {
    const title = sanitize(req.body.title);
    const items = [];
    for(let i in req.body.items){
      items.push(sanitize(req.body.items[i]));
    }
    const todo = new Todos({
        title:title,
        items:items,
        userId:req.user
    }); 
    todo.save()
        .then(result=>{
            console.log('Todo List Saved');
            res.status(201).redirect('/todo');
        })
        .catch(err=>{
            res.status(501).json({msg:'fail'})
            console.log(err)
        })
}

exports.getTodoLists = (req,res,next) => {
    Todos.find({userId:req.user._id})
    .then(list=>{
        res.render('viewTodoLists',{
            list:list,
            isAuthenticated: req.session.isLoggedIn
        })
    })
    .catch(err=>{
        console.log(err);
    })
}

exports.deleteTodoList = (req,res,next) => {
    const listId = req.params.listId;
    Todos.findById(listId)
      .then(list=>{
        if(!list){
          return new Error('List not found');
        }
        return Todos.deleteOne({_id:listId,userId:req.user._id})
      })
      .then(() => {
        console.log('deleted');
        res.status(200).json({message:'Success'});
      })
      .catch(err => {
        res.status(500).json({message:'Deletion Failed'});
      });
}

exports.postSchedule = (req,res,next) => {
    console.log(req.body);
    const title = sanitize(req.body.scheduleTitle);
    const items = req.body.items;
    const schedule = new Schedule({
        title: title,
        items: items,
        userId:req.user 
    });
    schedule.save()
        .then(result=>{
            console.log(result)
            console.log('Schedule Saved');
            res.status(201).redirect('/schedulemaker');
        })
        .catch(err=>{
            res.status(501).json({msg:'fail'})
            console.log(err)
        })
}

exports.getSchedule = (req,res,next) => {
    Schedule.find({userId:req.user._id})
      .then(sch=>{ 
        res.render('viewSchedule',{
          isAuthenticated: req.session.isLoggedIn,
          schedule: sch
        }) 
      })
      .catch(err=>{
        console.log(err)
      })
}

exports.deleteSchedule = (req,res,next) => {
    const schId = req.params.schId;
    console.log(schId);
    Schedule.findById(schId)
      .then(schedule=>{
        if(!schedule){
          return new Error('Schedule not found');
        }
        return Schedule.deleteOne({_id:schId,userId:req.user._id})
      })
      .then(() => {
        console.log('deleted');
        res.status(200).json({message:'Success'});
      })
      .catch(err => {
        res.status(500).json({message:'Deletion Failed'});
      });
}