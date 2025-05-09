 const mongoose = require('mongoose');

 mongoose.connect("mongodb://127.0.0.1:27017/dashboarddb");
 
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
 