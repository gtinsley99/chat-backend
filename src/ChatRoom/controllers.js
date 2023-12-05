const ChatRoom = require("./model");

const createChatRoom = async (req, res) => {
    try {
        const newChatRoom = new ChatRoom({
            members: [req.body.senderId, req.body.receiverId],
        });

        await newChatRoom.save();
        res.status(201).json(newChatRoom);

    } catch (error) {
        console.log(error);
        res.status(309).json({
          message: error.message,
          detail: error,
        });
    }
};

const getChatRoomOfUser = async (req, res) => {
    try {
        const chatRoom = await ChatRoom.find({members: {$in: [req.params.userId]}});
        res.status(200).json(chatRoom);
    } catch (error) {
        console.log(error);
        res.status(404).json({
          message: error.message,
          detail: error,
        });
    }
};

const getChatRoomOfUsers = async (req, res) => {
    try {
        const chatRoom = await ChatRoom.find({members: {$all: [req.params.firstUserId, req.params.secondUserId]}});
        res.status(200).json(chatRoom);
    } catch (error) {
        console.log(error);
        res.status(404).json({
          message: error.message,
          detail: error,
        });
    }
};

module.exports = {
    createChatRoom,
    getChatRoomOfUser,
    getChatRoomOfUsers
};