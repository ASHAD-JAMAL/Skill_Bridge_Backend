const Router = require("express").Router();
const {registerUser,loginUser} = require("../controller/UserController");
const { viewWorker, ViewWorkersAll } = require("../controller/workerController");
const {viewWokerProfile} = require("../controller/workerController");
const { verifyToken } = require("../middleware/authMiddleware");
const upload=require('../middleware/multerMiddleware');

Router.post("/user-register",upload.single('profileImage'),registerUser);
Router.post("/user-login",loginUser);
Router.post('/view-workers',verifyToken,viewWorker);
Router.post('/view-workerProfile',viewWokerProfile)
Router.get("/View-all-worker",ViewWorkersAll)

module.exports = Router;