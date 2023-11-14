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


module.exports = {
    addUser,
    deleteUser,
}