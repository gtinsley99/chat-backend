const mongoose = require("mongoose");

const ChatRoomSchema = new mongoose.Schema(
    {
        members: Array,
    },
    { timestamps: true }
);

const ChatRoom = mongoose.model("chatRoom", ChatRoomSchema);
module.exports =  ChatRoom;