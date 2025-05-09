const path = require('path');

const cors = require('cors')

const Post = require('../models/Post');  
const Task  = require('../models/Task');  

const User  = require('../models/User'); 

const bcrypt = require('bcrypt');

const PORT = 5004;

const express = require('express')
const app = express()

const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/dashboarddb");

console.log("MongoDB Connected");
const { Schema } = mongoose;
const { ObjectId } = mongoose;


app.use(cors());
app.use(express.json());

app.post('/saveTask', function (req, res, next)  {

                  const newTask = new Task({
                    userid: new Object(req.body.userid),
                    taskname: req.body.taskname,
                    taskstatus :  req.body.taskstatus,
                    priority: req.body.priority,
                    status:"active",
                   });
                   //console.log(newUser)
                   newTask.save()
                   .then(() => {
                     //console.log("User saved:","saved");
                         User.aggregate([{
                        $lookup:{
                            from:"tasks",
                            localField:"_id",
                            foreignField:"userid",
                            as:"task"
                        }
                    }])
                    .then((result) => {
                        res.send({ result : result});
                      })
                      .catch(err => {
                        //console.error("Error saving user:", err);
                        res.send({error:err.message});
                      });
                     })
                     
                     .catch(err => {
                       //console.error("Error saving user:", err);
                       res.send({error:err.message});
                     });

})


app.post('/editTask', function (req, res, next)  {

  const userid= new Object(req.body.userid)

   const taskname =  req.body.taskname;
   const taskstatus =  req.body.taskstatus;
   const priority =  req.body.priority;
   const id = req.body.id;
   
     var myquery = { '_id': new Object(id) };
     var newvalues = { $set: {'taskname': taskname, 'taskstatus': taskstatus,'priority':priority} };
     Task.updateOne(myquery,newvalues)
   .then(() => {
     //console.log("User saved:","saved");
     return  Task.find({ userid: userid});
     })
     .then((result) => {
      res.send({result: result});
     })
     .catch(err => {
       //console.error("Error saving user:", err);
       res.send({error:err.message});
     });

})
           
app.get('/gettaskByuserId/:id', (req, res) => {
  const id = new Object(req.params.id);
  
  Task.find({ userid: id})
    .then((result) => {
      //console.log(result);
      res.send({result: result});
    })
    .catch(err => {
      console.error("Error saving user:", err);
      res.send({error:err.message});
    });

 }) 

 app.get('/gettaskById/:id', (req, res) => {
  const id = req.params.id;
  //console.log(id)
  Task.findById({ _id: new Object(id)})
    .then((result) => {
     //  console.log(result);
      res.send({result: result});
    })
    .catch(err => {
      console.error("Error saving user:", err);
      res.send({error:err.message});
    });

 })



 app.post('/deleteById', (req, res) => {
  const id = req.body.id;
  const userid =new mongoose.Types.ObjectId( req.body.userid);
  //console.log(id,userid)
  Task.deleteOne({'_id': new Object(id)})
    .then(() => {
      Task.find({ userid: userid})
      .then((result) => {
        res.send({result: result});
      });
    })
    .catch(err => {
      console.error("Error saving user:", err);
      res.send({error:err.message});
    });
 })

 app.get('/gettotaltask', (req, res) => {
  
  Task.find()
    .then((result) => {
     //  console.log(result);
      res.send({result: result});
    })
    .catch(err => {
      console.error("Error saving user:", err);
      res.send({error:err.message});
    });

 }) 


  app.get('/getawholetask', (req, res) => {
  // const id = req.params.id;
   
   //Post.find().sort({"createdAt": -1})
 
   User.aggregate([{
     $lookup:{
         from:"tasks",
         localField:"_id",
         foreignField:"userid",
         as:"task"
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
 
  app.get('/getawholetaskUser/:id', (req, res) => {
   const id = req.params.id;
   console.log("hi     "+id)
   //Post.find().sort({"createdAt": -1})
 
   User.aggregate([
     {
       $match: {
         "_id": new  mongoose.Types.ObjectId(id)
       }
     },
     {
     $lookup:{
         from:"tasks",
         localField:"_id",
         foreignField:"userid",
         as:"task"
     }
     
 },
 {
   $lookup:{
     from:"posts",
     localField:"_id",
     foreignField:"userid",
     as:"post"
 }
 }
 
 ])
 
     .then((result) => {
       console.log(result)
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