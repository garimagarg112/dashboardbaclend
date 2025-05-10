 const mongoose = require('mongoose');

 mongoose.connect("mongodb+srv://garimagarg112:Garimagarg@123@cluster0.3r0qbab.mongodb.net/");
 

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