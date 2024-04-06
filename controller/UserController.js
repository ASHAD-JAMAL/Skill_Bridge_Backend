const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const httpStatusCode = require("../constant/httpStatusCode");
const UserModel = require("../models/userModel");
const { getToken } = require("../middleware/authMiddleware");
const {SendEmail}=require('../Services/emailService');

const registerUser = async (req, res) => {
  try {
    // validate incoming request data
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(httpStatusCode.BAD_REQUEST).json({
        success: false,
        errors: errors.array(),
      });
    }
    const {
      firstname,
      lastname,
      username,
      email,
      phone,
      password,
      city,
      state,
      zip,
      role,
    } = req.body;

    //check id user with provided email or phone already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(httpStatusCode.CONFLICT).json({
        success: false,
        message:
          "User is already registeres with this email or phone. please sign in",
      });
    }

    //Hash The Password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user= await UserModel.create({
      firstname,
      lastname,
      username,
      email,
      phone,
      password:hashedPassword,
      city,
      state,
      zip,
      role,
    })
    if(!user){
      return res.status(httpStatusCode.CONFLICT).json({
        success:false,
        message:"error is comming in the creating the user"
      })
    }
    // Send a congratulatory email to the user
    SendEmail(email,user.username);


    return res.status(httpStatusCode.CREATED).json({
      success: true,
      message: "User registered successfully",
      data: user,
    });
  } catch (error) {
    console.error("Error registering user:", error);
    return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Something went wrong!",
      error: error.message,
    });
  }
};
const loginUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(httpStatusCode.BAD_REQUEST).json({
        success: false,
        errors: errors.array(),
      });
    }
    const { email, password } = req.body;

    let user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(httpStatusCode.UNAUTHORIZED).json({
        success: false,
        message: "Invalid email. Please register first!",
      });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(httpStatusCode.UNAUTHORIZED).json({
        success: false,
        message: "Invalid password",
      });
    }


    SendEmail(email,user.username);
    const token = await getToken(user);

    return res.status(httpStatusCode.OK).json({
      success: true,
      message: "Successfully logged in!",
      data: { user, token, role: user.role },
    });
  } catch (error) {
    console.error("Error logging in:", error);
    return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Something Went Wrong!",
      error: error.message,
    });
  }
};



module.exports = {
  registerUser,
  loginUser,
};
