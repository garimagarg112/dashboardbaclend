 const mongoose = require('mongoose');



 
 
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

