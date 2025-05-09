 const mongoose = require('mongoose');

 mongoose.connect("mongodb://127.0.0.1:27017/dashboarddb");

 
 
 const { Schema } = mongoose;
 const { ObjectId } = mongoose;
 const schemaOptions = {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  };
  
   const Postschema = new mongoose.Schema({
     
    userid: Schema.Types.ObjectId,
    name: String,
    desc : String,
    image : String,
    status : String
  });
  Postschema.set('timestamps', true); 
  
  module.exports = Post = mongoose.model('Post', Postschema);

