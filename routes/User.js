const express = require("express");

const path = require('path');


const router = express.Router();


const user_controller = require("../controllers/LoginBack");

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

router.post("/", user_controller.index);

router.post("/getloginuser", user_controller.getloginuser);

router.post("/getuser", user_controller.getuser);

router.post("/saveUser", upload.single('image'), user_controller.saveUser);

router.post("/updateUser", upload.single('image'), user_controller.updateUser);

router.get("/getAlluser", user_controller.getAlluser);

router.get("/getuserById/:id", user_controller.getuserById);

router.get("/gettoken/:token", user_controller.gettoken);

module.exports = router;