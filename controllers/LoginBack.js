


const Post = require('../models/Post');  

const Task  = require('../models/Task');  

const User  = require('../models/User'); 

const bcrypt = require('bcrypt');

const asyncHandler = require("express-async-handler");

require('dotenv').config();


const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

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


exports.index = asyncHandler(async (req, res, next) => {
  
  res.send({result : "NOT IMPLEMENTED: Site Home Page"});

  });
 
  exports.getloginuser =  asyncHandler(async (req, res) => {
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


   exports.saveUser =  asyncHandler(async (req, res, next) => {
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


    exports.getuser =  asyncHandler(async (req, res) => {
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


    exports.updateUser =  asyncHandler(async (req, res, next) =>  {
     
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

    exports.getAlluser =  asyncHandler(async (req, res) => {
        
        User.find()
        .then((result) => {
          res.send({result: result});
        })
        .catch(err => {
          //console.error("Error saving user:", err);
          res.send({error:err.message});
        });
      
       })


    exports.getuserById =  asyncHandler(async (req, res) => {
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


    exports.gettoken =  asyncHandler(async (req, res) => {
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
 

 
  })
        
    
  
 


