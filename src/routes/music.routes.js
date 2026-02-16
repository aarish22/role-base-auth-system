const express = require("express");
const musicController = require("../controllers/music.controller");

const multer = require("multer");


const upload = multer({
  storage: multer.memoryStorage(),
  limits: {fileSize: 10 * 1024 * 1024}, // 10MB limit
});

const router = express.Router();

router.post("/upload",upload.single("music") ,musicController.createMusic);

module.exports = router;