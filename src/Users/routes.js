const {Router} = require("express");
const userRouter = Router();

const {addUser, deleteUser, loginUser, loginWithToken} = require("./controllers");
const {hashPassword, passwordCheck, tokenCheck} = require("../middleware/index");

// Register user
userRouter.post("/adduser", hashPassword, addUser);
// Delete user
userRouter.delete("/deleteuser", tokenCheck, passwordCheck, deleteUser);
// Login user
userRouter.post("/login", passwordCheck, loginUser),
// Login user with token
userRouter.get("/loginwithtoken", tokenCheck, loginWithToken);

module.exports = userRouter;