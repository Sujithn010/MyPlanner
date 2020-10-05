const express = require('express');
const mongoose = require('mongoose');
const mongodbKey = require('./keys/keys');
const mainRoutes = require('./routes/index');
const authRoutes = require('./routes/auth');
const functionalitiesRoutes = require('./routes/funtionalities');
const path = require('path');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const User = require('./models/User');

const app = express();

const MONGODB_URI = mongodbKey.mongodb_uri;
const store = new MongoDBStore({
    uri: MONGODB_URI,
    collection: 'sessions'
})

//view engine
app.set('view engine','ejs');
app.set('views','views');

//middlewares
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')));
app.use(flash());
app.use(session({
    secret:'supersecret',
    resave:false,
    saveUninitialized:false,
    store:store
}));

app.use((req,res,next)=>{
    if(!req.session.user){
        return next();
    }
    User.findById(req.session.user._id)
        .then(user=>{
            if(!user){
                next();
            }
            req.user = user;
            next();
        })
        .catch(err=>{
            // console.log(err)
            next(new Error(err));
        });
})

//Route handlers
app.use(mainRoutes);
app.use(authRoutes);
app.use(functionalitiesRoutes);

mongoose.connect(MONGODB_URI)
    .then(result=>{
        app.listen(3000);
    })
    .catch(err=>{
        console.log(err)
    }); 