const {Router} = require("express");
const userRouter = Router();

const {addUser, deleteUser, loginUser, loginWithToken, getAllUsers, getUser} = require("./controllers");
const {hashPassword, passwordCheck, tokenCheck} = require("../middleware/index");

// Register user
userRouter.post("/adduser", hashPassword, addUser);
// Delete user
userRouter.delete("/deleteuser", tokenCheck, passwordCheck, deleteUser);
// Login user
userRouter.post("/login", passwordCheck, loginUser),
// Login user with token
userRouter.get("/loginwithtoken", tokenCheck, loginWithToken);
// Get all users
userRouter.get("/allusers", getAllUsers);
// // Get one user
userRouter.get("/:userId", getUser);

module.exports = userRouter;