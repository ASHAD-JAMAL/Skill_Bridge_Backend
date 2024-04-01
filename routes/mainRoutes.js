const Router = require("express").Router();
const {registerUser,loginUser} = require("../controller/UserController");
// const { verifyToken } = require("../middleware/authMiddleware");

Router.post("/user-register",registerUser);
Router.post("/user-login",loginUser);
// Router.get('/view-users',verifyToken,ViewUsers);

module.exports = Router;