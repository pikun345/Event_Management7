const express = require('express');
const router = express.Router();
const { register, login,adminlogin,current} = require("../controller/cont");
const ValidateToken = require("../middleware/validateTok");

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/adminlogin").post(adminlogin);//admin token generate
router.route("/current").post(ValidateToken,current);//admin token 


module.exports = router;
