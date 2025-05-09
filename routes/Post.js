const express = require("express");

const path = require('path');


const router = express.Router();

const postvw_controller = require("../controllers/Post");

const upload = require("../middleware/upload"); // path to your multer config


router.get("/getawholepost", postvw_controller.getawholepost);

router.get("/getpostDashboard", postvw_controller.getpostDashboard);

router.get("/getpost", postvw_controller.getpost);

router.post("/delpost", postvw_controller.delpost);

router.get("/getallpost/:id", postvw_controller.getallpost);

router.get("/getallpostId/:id", postvw_controller.getallpostId);

router.get("/getpostByuserId/:id", postvw_controller.getpostByuserId);  

router.post("/savePost", upload.single('image'), postvw_controller.savePost);

router.post("/editPost", upload.single('image'), postvw_controller.editPost);

module.exports = router;