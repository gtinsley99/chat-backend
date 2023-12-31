const jwt = require("jsonwebtoken");
const User = require("../Users/model");
const bcrypt = require("bcrypt");

// Encrypts user password to store in db
const hashPassword = async (req, res, next) => {
    try {
      if (req.body.newpassword){
          req.body.password = req.body.newpassword
      };
      const saltRounds = parseInt(process.env.SALT);
      const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
      req.body.password = hashedPassword;
      next();
    } catch (error) {
      console.log(error);
      res.status(501).json({
        message: error.message,
        error: error,
      });
    }
  };

// Checks if username + password matches user in db
const passwordCheck = async (req, res, next) => {
    try {
      let match = false;
      const userDetails = await User.findOne({ username: req.body.username });
      if (userDetails) {
        const compare = await bcrypt.compare(
          req.body.password,
          userDetails.password
        );
        if (compare) {
          match = true;
        };
      };
      // If not a match gives error, doesn't reach next
      if (!match) {
        throw new Error("Username or password incorrect");
      };
      if (req.body.newpassword){
        const samePass = await bcrypt.compare(
          req.body.newpassword,
          userDetails.password
        );
        if (samePass){
          throw new Error("Same as current password");
        };
      };
      next();
    } catch (error) {
      console.log(error);
      res.status(501).json({
        message: error.message,
        error: error,
      });
    }
  };

// Check if jwt is valid 
const tokenCheck = async (req, res, next) => {
    try {
      const userID = jwt.verify(req.header("Authorization").replace("Bearer ",""), process.env.JWTPASSWORD)._id;
      const user = await User.findOne({_id: userID});
      if (!user){
        throw new Error ("User not found");
      } else {
        req.user = user;
        next();
      };
    } catch (error) {
      console.log(error);
      res.status(501).json({
        message: error.message,
        error: error,
      });
    }
};
    
module.exports = {
    hashPassword,
    passwordCheck,
    tokenCheck
};