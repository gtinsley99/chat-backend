const {Router} = require("express");
const chatRoomRouter = Router();

const {createChatRoom, getChatRoomOfUser, getChatRoomOfUsers} = require("./controllers");

// Make a chat room
chatRoomRouter.post("/", createChatRoom);
// Find chat room of user
chatRoomRouter.get("/:userId", getChatRoomOfUser);
// Find chat room of users
chatRoomRouter.get(":firstUserId/:secondUserId", getChatRoomOfUsers);

module.exports = chatRoomRouter;