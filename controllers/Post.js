

const Post = require('../models/Post');  
//const Task  = require('../models/Task');  

const User  = require('../models/User'); 

const asyncHandler = require("express-async-handler");
const mongoose = require('mongoose');
const { ObjectId } = mongoose;

 
 exports.getawholepost = asyncHandler(async(req, res) => {
   const id = req.params.id;
   
   //Post.find().sort({"createdAt": -1})
 
   User.aggregate([{
     $lookup:{
         from:"posts",
         localField:"_id",
         foreignField:"userid",
         as:"post"
     }
 }])
 
     .then((result) => {
       res.send({result: result});
     })
     .catch(err => {
       console.error("Error saving user:", err);
       res.send({error:err.message});
     });
 
  }) 

  exports.getallpost = asyncHandler(async(req, res) => {
    const id =  new Object(req.params.id);
    
    Post.find({ userid:{ $ne: id } }).sort({"createdAt": -1})
      .then((result) => {
       //  console.log(result);
        res.send({result: result});
      })
      .catch(err => {
        console.error("Error saving user:", err);
        res.send({error:err.message});
      });
  
   }) 


   exports.getallpostId = asyncHandler(async(req, res) => {
    const id =  new Object(req.params.id);
    
    Post.find({ _id: id  }).sort({"createdAt": -1})
      .then((result) => {
       //  console.log(result);
        res.send({result: result[0]});
      })
      .catch(err => {
        console.error("Error saving user:", err);
        res.send({error:err.message});
      });
  
   }) 

   exports.delpost = asyncHandler(async (req, res, next) => {

          const id = req.body.id;
          const userid =new mongoose.Types.ObjectId( req.body.userid);
          //console.log(id,userid)
          Post.deleteOne({'_id': new Object(id)})
            .then(() => {
              Post.find({ userid: userid})
              .then((result) => {
                res.send({result: result});
              });
            })
            .catch(err => {
              console.error("Error saving user:", err);
              res.send({error:err.message});
            });

   })


  exports.savePost = asyncHandler(async (req, res, next) => {
          let userid = new Object( req.body.userid)
                      const newPost = new Post({
                        name: req.body.name,
                        desc: req.body.desc,
                        userid :  new Object( req.body.userid),
                        image : req.file ? req.file.originalname : "p1.jpg" ,
                        status:"active",
                       // task :  req.body.task
                       });
                      
    
                     //  res.send({ req });
                  //  console.log(newUser)
                    
                     
                  newPost.save()
                       .then(() => {
                         //console.log("User saved:","saved");
                         return Post.find({ userid: userid}).sort({"createdAt": -1})
                         })
                         .then((result) => {
                         // console.log(result)
                           res.send({ result:result });
                         })
                         .catch(err => {
                           //console.error("Error saving user:", err);
                           res.send({error:err.message});
                         });
    
                 
     });
  

  exports.getpostByuserId = asyncHandler(async (req, res) => {
        const id =  new Object(req.params.id);
        
        Post.find({ userid: id}).sort({"createdAt": -1}).limit(5)
          .then((result) => {
           //  console.log(result);
            res.send({result: result});
          })
          .catch(err => {
            console.error("Error saving user:", err);
            res.send({error:err.message});
          });
      
       }) 


   exports.getpost = asyncHandler(async(req, res) => {
          
          Post.find().sort({"createdAt": -1})
            .then((result) => {
             //  console.log(result);
              res.send({result: result});
            })
            .catch(err => {
              console.error("Error saving user:", err);
              res.send({error:err.message});
            });
        
         }) 
        
  exports.getpostDashboard = asyncHandler(async(req, res) => {
          
          Post.find().sort({"createdAt": -1}).limit(5)
            .then((result) => {
             //  console.log(result);
              res.send({result: result});
            })
            .catch(err => {
              console.error("Error saving user:", err);
              res.send({error:err.message});
            });
        
         }) 


  exports.editPost = asyncHandler(async(req, res, next) => {
    
      const userid= new Object(req.body.userid)
    
      const id =  req.body.id;
       const name =  req.body.name;
       const desc =  req.body.desc;
       image = req.file ? req.file.originalname : req.body.image 
       const status = "active";
       
         var myquery = { '_id': new Object(id) };
         var newvalues = { $set: {'name': name, 'desc': desc,'image':image,status:status} };
         Post.updateOne(myquery,newvalues)
       .then(() => {
         //console.log("User saved:","saved");
         return  Post.find({ userid: userid});
         })
         .then((result) => {
          res.send({result: result});
         })
         .catch(err => {
           //console.error("Error saving user:", err);
           res.send({error:err.message});
         });
    
    })
