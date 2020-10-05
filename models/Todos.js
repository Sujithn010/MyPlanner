const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./User');

const todoSchema =  new Schema({
    title:{
        type: String,
        required:true
    },
    items:{
        type: [String],
        required:true
    },
    userId:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required:true
    },
},{ timestamps: true });

module.exports = mongoose.model('Todos',todoSchema);