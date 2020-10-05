const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const scheduleItemsSchema =  new Schema({
    title:{
        type:String,
        required:true
    },
    day: {
        type:String,
        required:true
    },
    startTime: {
        type:String,
        required:true
    },
    endTime: {
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    important: Boolean
});

module.exports = scheduleItemsSchema;