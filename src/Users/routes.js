const {Router} = require("express");
const userRouter = Router();

const {addUser} = require("./controllers");
const {hashPassword, passwordCheck, tokenCheck} = require("../middleware/index");

userRouter.post("/adduser", hashPassword, addUser);

module.exports = userRouter;