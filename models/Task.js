 const mongoose = require('mongoose');

 mongoose.connect("mongodb+srv://garimagarg112:Garimagarg@123@cluster0.3r0qbab.mongodb.net/");
 
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
 