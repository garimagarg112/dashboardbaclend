const path = require('path');

const cors = require('cors')

const Post = require('../models/Post');  
//const Task  = require('../models/Task');  

const User  = require('../models/User'); 

const bcrypt = require('bcrypt');

const PORT = 5003;

const express = require('express')
const app = express()


app.use(cors());
app.use(express.json());


 
 app.use('/Uploadimage', express.static(path.join(__dirname,'Uploadimage')));

const multer  = require('multer')
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
      cb(null, './Uploadimage');
  },
  filename: function (req, file, cb) {
      //console.log(file.originalname);
      cb(null , file.originalname );
  }
});

const upload = multer({ storage: storage })


 app.get('/getallpost/:id', (req, res) => {
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

 app.post('/savePost', upload.single('image'), function (req, res, next)  {
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
 
  app.get('/getpostByuserId/:id', (req, res) => {
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
 
 

 
  app.get('/getawholepost', (req, res) => {
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
  
  app.get('/getpost', (req, res) => {
   
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
 
  app.get('/getpostDashboard', (req, res) => {
   
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
  app.listen(PORT, () => {
     console.log(`Example app listening on port ${PORT}`)
   })
