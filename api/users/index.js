const express = require("express");
const router = express.Router();
const userController = require("./user");
const {authenticating} =require("../../middlewares/auth");
const uploads = require('../../middlewares/uploadImage');
router.post("/register",userController.register);
router.post("/login",userController.login);
router.post("/upload-avatar", authenticating,uploads.single('avatar'),userController.uploadAvatar);
router.get("/:id",authenticating,userController.getProfile)
module.exports= router;