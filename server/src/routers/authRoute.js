const express = require('express');
const { register, login, fetchUser, logout } = require('../controllers/authControl');
const imgUpload = require('../middlewares/imageUpload');
const checkToken = require('../middlewares/checkToken');

const router = express.Router();

router.post("/register",
    imgUpload.single("img"),
    register);

router.post("/login", login);
router.get("/logout", logout);
router.get("/access", checkToken, fetchUser);

module.exports = router;