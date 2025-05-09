 const mongoose = require('mongoose');

 mongoose.connect("mongodb://127.0.0.1:27017/dashboarddb");
 

 const Userschema = new mongoose.Schema({
      name: String,
      email: String,
      phone : Number,
      skills: String,
      lang: String,
      pass: String,
      image : String,
    //  task: String,
      status : String
   });
 
   module.exports = User = mongoose.model('users', Userschema);