const express = require('express');
const { register, login, fetchUser } = require('../controllers/authControl');
const imgUpload = require('../middlewares/imageUpload');
const checkToken = require('../middlewares/checkToken');

const router = express.Router();

router.post("/register",
    imgUpload.single("img"),
    register);

router.post("/login", login);

router.post("/access", checkToken, fetchUser);

module.exports = router;