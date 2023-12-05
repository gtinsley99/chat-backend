const ChatMessage = require("./model");

const createNewMessage = async (req, res) => {
    try {
        const newMessage = new ChatMessage(req.body);
        await newMessage.save();
        res.status(201).json(newMessage);
    } catch (error) {
        console.log(error);
        res.status(501).json({
          message: error.message,
          detail: error,
        });
    }
};

const getMessages = async (req, res) => {
    try {
        const messages = await ChatMessage.findAll({chatRoomId: req.params.chatRoomId});
    } catch (error) {
        console.log(error);
        res.status(501).json({
          message: error.message,
          detail: error,
        });
    }
};

module.exports = {
    createNewMessage,
    getMessages,
}