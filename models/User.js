const mongoose = require('mongoose');
const Notes = require('./Notes');
const Todos = require('./Todos');
const Schedule = require('./Schedule');
const Schema = mongoose.Schema;

const userSchema =  new Schema({
    email:{
        type:String,
        required:true
    },
    password: {
        type:String,
        required:true
    },
    notes:{
        type:Schema.Types.ObjectId,
        // required: true,
        ref: 'Notes'
    },
    todos:{
        type:Schema.Types.ObjectId,
        ref: 'Todos'/*,
        required:true*/
    },
    schedule:{
        type: Schema.Types.ObjectId,
        ref: 'Schedule'/*,
        required: true*/
    }
});

module.exports = mongoose.model("Users",userSchema);