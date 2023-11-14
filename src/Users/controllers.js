const User = require("./model");

const addUser = async (req, res) => {
    try {
        const user = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        });
        res.status(201).json({
            message: "User registered",
            username: user.username,
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
}