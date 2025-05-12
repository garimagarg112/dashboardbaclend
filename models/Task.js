 const mongoose = require('mongoose');

 
 const { Schema } = mongoose;
 const { ObjectId } = mongoose;

const Taskschema = new mongoose.Schema({
   
    userid: Schema.Types.ObjectId,
    taskname: String,
    taskstatus : String,
    priority: String,
    status : String
 });

 module.exports = Task = mongoose.model('tasks', Taskschema);
 
