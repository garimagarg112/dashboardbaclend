const express = require("express");

const path = require('path');


const router = express.Router();

const task_controller = require("../controllers/TaskBack");

router.get("/getawholetask", task_controller.getawholetask);

router.get("/getawholetaskUser/:id", task_controller.getawholetaskUser);

router.get("/gettotaltask", task_controller.gettotaltask);

router.get("/gettaskByuserId/:id", task_controller.gettaskByuserId);

router.get("/gettaskById/:id", task_controller.gettaskById);

router.post("/saveTask", task_controller.saveTask);

router.post("/deleteById", task_controller.deleteById);

router.post("/editTask", task_controller.editTask);


module.exports = router;