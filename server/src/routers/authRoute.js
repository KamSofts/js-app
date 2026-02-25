const express = require('express');
const multer = require('multer');

const { register } = require('../controllers/authControl');
const imgUpload = require('../middlewares/imageUpload');

const router = express.Router();

router.post("/register",
    imgUpload.single("img"),
    register);

module.exports = router;