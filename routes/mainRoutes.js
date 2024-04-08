const Router = require("express").Router();
const {registerUser,loginUser} = require("../controller/UserController");
const { viewWorker } = require("../controller/workerController");
const {viewWokerProfile} = require("../controller/workerController")


Router.post("/user-register",registerUser);
Router.post("/user-login",loginUser);
Router.post('/view-workers',viewWorker)
Router.post('/view-workerProfile',viewWokerProfile)

module.exports = Router;