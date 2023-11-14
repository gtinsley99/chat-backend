const {Router} = require("express");
const userRouter = Router();

const {addUser, deleteUser, loginUser} = require("./controllers");
const {hashPassword, passwordCheck, tokenCheck} = require("../middleware/index");

// Register user
userRouter.post("/adduser", hashPassword, addUser);
// Delete user
userRouter.delete("/deleteuser", tokenCheck, passwordCheck, deleteUser);
// Login user
userRouter.get("/login", passwordCheck, loginUser),

module.exports = userRouter;