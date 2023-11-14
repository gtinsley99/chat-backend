const {Router} = require("express");
const userRouter = Router();

const {addUser, deleteUser} = require("./controllers");
const {hashPassword, passwordCheck, tokenCheck} = require("../middleware/index");

userRouter.post("/adduser", hashPassword, addUser);
userRouter.delete("/deleteuser", tokenCheck, passwordCheck, deleteUser);

module.exports = userRouter;