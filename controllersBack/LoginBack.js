const path = require('path');

const cors = require('cors')

const Post = require('../models/Post');  

const Task  = require('../models/Task');  

const User  = require('../models/User'); 

const bcrypt = require('bcrypt');

const PORT = 5002;

const express = require('express')
const app = express()

const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');


// Set up Global configuration access
dotenv.config({ path: '../.env' });




app.use(cors());
app.use(express.json());

const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/dashboarddb");

console.log("MongoDB Connected");
const { Schema } = mongoose;
const { ObjectId } = mongoose;



 
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


 app.post('/saveUser', upload.single('image'), function (req, res, next)  {
  let pass = req.body.pass;
  let name =  req.body.name
  const filename = req.file;
  //console.log(filename)
  //console.log(pass)
  const saltRounds = 5;
    bcrypt.genSalt(saltRounds, (err, salt) => {
        if (err) {
            // Handle error
            res.send({error: err.message })
        }
        //console.log('salt generated  successfully:', salt);
                bcrypt.hash(pass, salt, (err, hash) => {
                  if (err) {
                      // Handle error
                      res.send({error: err.message })
                  }
                 

                  const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    phone :  req.body.phone,
                    skills: req.body.skills,
                    lang:  req.body.lang,
                    pass:  hash,
                    image : req.file ? req.file.originalname : "a5.jpg" ,
                    status:"active",
                   // task :  req.body.task
                   });
                  

                 //  res.send({ req });
              //  console.log(newUser)
                
                 
                   newUser.save()
                   .then(() => {
                     //console.log("User saved:","saved");
                     return User.findOne({'name': name});
                     })
                     .then((result) => {
                      let jwtSecretKey = process.env.JWT_SECRET_KEY;
                      const token =  generateToken(result["_id"])
                      const verified = jwt.verify(token, jwtSecretKey);
                      if (verified) {
                      res.send({ result : result,token: token });
                      }
                     else {
                      // Access Denied
                      return res.status(401).send({ error : "Something went wrong"});
                  }
                     })
                     .catch(err => {
                       //console.error("Error saving user:", err);
                       res.send({error:err.message});
                     });

                })
              })
 });

 app.post('/updateUser', upload.single('image'), function (req, res, next)  {

//console.log("first")
let id = req.body.id
                 

                  const newUser = {
                    name: req.body.name,
                    email: req.body.email,
                    phone :  req.body.phone,
                    skills: req.body.skills,
                    lang:  req.body.lang,
                    image : req.file ? req.file.originalname : req.body.image ,
                    status:"active",
                   // task :  req.body.task
                   };
                  

                 //  res.send({ req });
                //console.log(newUser)
                  var myquery = { '_id': new Object(id) };
                  var newvalues = { $set: newUser};
                  User.updateOne(myquery,newvalues)
                   .then(() => {
                     //console.log("User saved:","saved");
                     return User.findById({ _id: new Object(id)})
                     })
                     .then((result) => {
                       res.send({ result });
                     })
                     .catch(err => {
                       //console.error("Error saving user:", err);
                       res.send({error:err.message});
                     });

               
             
 });

 app.post('/getuser', (req, res) => {
  let name =  req.body.name;
  let email  =  req.body.email ;
  User.find(
   {    "$or": [{
    "name": name
      }, {
          "email": email
      }]
}
  )
  .then((result) => {
    res.send({result: result});
  })
  .catch(err => {
    //console.error("Error saving user:", err);
    res.send({error:err.message});
  });

 })

 app.get('/getAlluser', (req, res) => {
  
  User.find()
  .then((result) => {
    res.send({result: result});
  })
  .catch(err => {
    //console.error("Error saving user:", err);
    res.send({error:err.message});
  });

 })



 app.get('/getuserById/:id', (req, res) => {
  const id = req.params.id;
  //console.log(id)
  User.findById({ _id: new Object(id)})
    .then((result) => {
     //  console.log(result);
      res.send({result: result});
    })
    .catch(err => {
    //  console.error("Error saving user:", err);
      res.send({error:err.message});
    });

 })



const generateToken = (userid) => {
  const expiresIn = 60*60; // 1 day
  let jwtSecretKey = process.env.JWT_SECRET_KEY;
  let data = {
          time: Date(),
          userId: userid,
          exp: Math.floor(Date.now() / 1000) + expiresIn // Correctly using seconds
      }

      const token = jwt.sign(data, jwtSecretKey);
    return token;
}

const verifyToken = (token) => {

  let  jwtSecretKey = process.env.JWT_SECRET_KEY;
  jwt.verify(token, jwtSecretKey, (err, decoded) => {
   if (err) {
     return "false"
   }
   
     return  "true"
   
 
 
  })

}

app.get('/gettoken/:token', (req, res) => {
  const token = req.params.token;
  let jwtSecretKey = process.env.JWT_SECRET_KEY;
  const verified = jwt.verify(token, jwtSecretKey, (err, decoded) => {
    if (err) {
          //console.log(err.name)
          res.send({result:err.name});
    }
    else{
      res.send({result: decoded});
    }
})

  // User.findById({ _id: new Object(id)})
  //   .then((result) => {
  //    //  console.log(result);
  //     res.send({result: result});
  //   })
  //   .catch(err => {
  //   //  console.error("Error saving user:", err);
  //     res.send({error:err.message});
  //   });

 })



 app.post('/getloginuser', (req, res) => {
   let name =  req.body.namelg;
   let pass  =  req.body.passlg ;
   // var sql = "SELECT * FROM users WHERE (name='"+name+"' AND pass='"+pass+"') OR (email='"+email+"' AND pass='"+pass+"')";
 
   User.find(
    {    "$or": [{
     "name": name
       }, {
           "email": name
       }]
 }
   )
   .then((result) => {

    if(result.length > 0){


        bcrypt.compare(pass, result[0]["pass"], (err, passresult) => {
            if (err) {
                // Handle error
                if (err) res.send({error: err.message })
            }
        
            if (passresult) {
                // Passwords match, authentication successful
                let jwtSecretKey = process.env.JWT_SECRET_KEY;
                const token =  generateToken(result[0]["_id"])
                  //  console.log(token)
                 

                const verified = jwt.verify(token, jwtSecretKey)
              //  console.log(verified)

                if (verified) {

                  res.send({result:result[0],token:token})  
                //  return res.send("Successfully Verified");
              } else {
                  // Access Denied
                  return res.status(401).send({ error : "Something went wrong"});
              }
               // 
            } else {
                // Passwords don't match, authentication failed
                res.send({result: "password not matched" })
            }
            });

     }
    else{
        res.send({result: "Wrong login credentials" })
    }
  


     
   })
   .catch(err => {
     //console.error("Error saving user:", err);
     res.send({error:err.message});
   });
   });
  
 


 app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
  })