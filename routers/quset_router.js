const express = require('express');
const router = express.Router();
const quest_controller = require('../controller/quest_controller');


// GET
router.get("/", quest_controller.getPage);

router.post("/", quest_controller.getPage);

//////////////////////

router.get("/add", quest_controller.getAllQusest);

router.get("/add-old/:id", quest_controller.getOneQusest);

router.post("/add", quest_controller.createQusest);

router.post("/add-old/:id", quest_controller.updateQusest);

router.post("/delete/:id", quest_controller.deleteQusest);


module.exports = router