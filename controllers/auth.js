const bcrypt = require('bcryptjs');
const {validationResult} = require('express-validator/check');
const User = require('../models/User');

exports.getLogin = (req,res,next) => {
    let message = req.flash('error');
    if (message.length > 0) {
        message = message[0];
    } else {
        message = null;
    }
    res.render('login',{
        errorMessage: message,
        oldInput:{
            email: '',
            password: ''
        }
    })
}

exports.postLogin = (req,res,next) => {
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({email:email})
    .then(user => {
      if(!user){
        return res.status(422).render('login', {
          errorMessage: 'Email does not exist',
          oldInput: {
            email:email,
            password:password
          }
        });
      }
      bcrypt.compare(password,user.password)
        .then(doMatch=>{  //returns a true or false value
          if(doMatch){
            req.session.isLoggedIn = true;
            req.session.user = user;
            console.log('Session created');
            return req.session.save(err=>{
                console.log(err);
                res.redirect('/');
            });
          }
          res.status(422).render('login', {
            errorMessage: 'Invalid email or password',
            oldInput: {  
              email:email,
              password:password
            }
          });
        })
    })
    .catch(err => {
        console.log(err);
    });
}

exports.getSignup = (req,res,next) => {
    let message = req.flash('error');
    if (message.length > 0) {
        message = message[0];
    } else {
        message = null;
    }
    res.render('signup',{
        errorMessage: message,
        oldInput:{
            email:'',
            password: ''
        }
    });
}

exports.postSignup = (req,res,next) => {
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      req.flash('error','Invalid email');
      return res.redirect('/signup');
    }
    User.findOne({email:email})
    .then(userDoc=>{
      if(userDoc){
        req.flash('error','Email already exists');
        return res.redirect('/signup');
      }
      if(password.length<5){
        req.flash('error','Please enter a password that is atleast 5 characters long');
        return res.redirect('/signup');
      }
      if(password!==confirmPassword){
        req.flash('error','Passwords do not match');
        return res.redirect('/signup');
      }
    bcrypt.hash(password,12)
      .then(hashedPassword=>{
        const user = new User({
          email:email,
          password:hashedPassword
        });
        return user.save();
      })
      .then(result=>{
        // console.log('New user Signed Up');
        res.redirect('/login');
      })
    })
    .catch(err=>{
        console.log(err);
    })
}

exports.getLogout = (req, res, next) => {
    req.session.destroy(err => {
      console.log("Err2");
      res.redirect('/');
    });  
  };