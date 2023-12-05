const {Router} = require("express");
const chatMessageRouter = Router();

const {createNewMessage, getMessages} = require("./controllers");

// Create a message
chatMessageRouter.post("/", createNewMessage);
// Get all messages from chat room
chatMessageRouter.get("/:chatRoomId", getMessages);

module.exports = chatMessageRouter;