const mongoose = require("mongoose");

const ChatMessageSchema = new mongoose.Schema(
    {
        chatRoomId: String,
        sender: String,
        message: String,
    },
    { timestamps: true }
);

const ChatMessage = mongoose.model("chatMessage", ChatMessageSchema);
module.exports = ChatMessage;