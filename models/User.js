 const mongoose = require('mongoose');


 

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
