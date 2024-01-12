const User = require("./model");
const jwt = require("jsonwebtoken");

const addUser = async (req, res) => {
    try {
        const user = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        });
        const token = jwt.sign({_id: user._id}, process.env.JWTPASSWORD, {expiresIn: "7d"});
        res.status(201).json({
            message: "User registered",
            username: user.username,
            token: token,
        });
    } catch (error) {
        console.log(error);
        res.status(501).json({
          message: error.message,
          detail: error,
        });
    }
};

const deleteUser = async (req, res) => {
    try {
        const user = await User.findOneAndDelete({
            username: req.body.username,
        });
        res.status(201).json({
            message: "User deleted",
            username: req.body.username,
        });
    } catch (error) {
        console.log(error);
        res.status(501).json({
          message: error.message,
          detail: error,
        });
    }
};

const loginUser = async (req, res) => {
    try {
        const user = await User.findOne({
            username: req.body.username,
        });
        const token = jwt.sign({_id: user._id}, process.env.JWTPASSWORD, {expiresIn: "7d"});
        res.status(201).json({
            message: "Logged in",
            username: user.username,
            token: token,
        });
    } catch (error) {
        console.log(error);
        res.status(501).json({
          message: error.message,
          detail: error,
        });
    }
};

const loginWithToken = async (req, res) => {
    try {
        const userDetails = await User.findOne({
            username: req.user.username,
        });
        res.status(201).json({
            message: "Logged in",
            username: userDetails.username,
        });
    } catch (error) {
        console.log(error);
        res.status(501).json({
          message: error.message,
          detail: error,
        });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const userList = await User.find({}).select("username");
        res.status(201).json({
            message: "success",
            users: userList,
        })
    } catch (error) {
        console.log(error);
        res.status(501).json({
          message: error.message,
          detail: error,
        });
    }
}

const getUser = async (req, res) => {
    try {
        const userList = await User.findOne({_id: req.params.userId}).select("username");
        res.status(201).json({
            message: "success",
            users: userList,
        })
    } catch (error) {
        console.log(error);
        res.status(501).json({
          message: error.message,
          detail: error,
        });
    }
}

module.exports = {
    addUser,
    deleteUser,
    loginUser,
    loginWithToken,
    getAllUsers,
    getUser,
}