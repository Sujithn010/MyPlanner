const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./User');
const ScheduleItems = require('./scheduleItems');

const scheduleSchema =  new Schema({
    title:{
        type:String,
        required:true
    },
    items:[{
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
    }],
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required:true
    }
},{timestamps:true});

module.exports = mongoose.model('Schedule',scheduleSchema);