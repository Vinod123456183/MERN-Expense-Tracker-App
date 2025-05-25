const errorHandler = require("../utils/error");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { formatDistanceToNow } = require("date-fns");
const rateLimit = require("express-rate-limit");
const userModel = require("../models/user-model");

const signUpController = async (req, res, next) => {
  try {
    const { userName, email, password } = req.body;

    const isUserAlready = await userModel.findOne({ email });
    if (isUserAlready) {
      return next(errorHandler(400, "User Already Exists"));
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new userModel({
      userName,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    const createdAtDiff = formatDistanceToNow(newUser.createdAt, {
      addSuffix: true,
    });

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: {
        id: newUser._id,
        userName: newUser.userName,
        email: newUser.email,
        createdAt: newUser.createdAt.toISOString(),
        createdAtDiff,
      },
    });
  } catch (error) {
    next(errorHandler(500, "Internal Server Error"));
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Validate if email and password are provided
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and Password are required",
      });
    }

    // 2. Find the user by email
    const validUser = await userModel.findOne({ email });
    if (!validUser) {
      return res.status(400).json({
        success: false,
        message: "User Not Found!",
      });
    }

    // 3. Compare the provided password with the stored hash using bcrypt
    const validPassword = await bcrypt.compare(password, validUser.password);
    if (!validPassword) {
      return res.status(401).json({
        success: false,
        message: "Wrong Credentials",
      });
    }

    // 4. Generate JWT token
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });

    // 5. Send response after removing the password from the response
    const { password: pass, ...rest } = validUser._doc;

    res
      .cookie("access_token", token, {
        httpOnly: true,
        sameSite: "None",
        path: "/",
        secure: true,
      })
      .status(200)
      .json({
        success: true,
        message: "Login Successful",
        user: rest,
      });
  } catch (error) {
    console.error("Login error:", error);

    // Token expiration check (not common, but good to handle)
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Token has expired",
      });
    }

    // If something else went wrong (like DB failure, etc.)
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const logOutController = async (req, res, next) => {
  try {
    res.clearCookie("access_token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",

      sameSite: "Strict",
      path: "/",
    });
    res.status(200).json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    next(error);
  }
};

// const authUser = async (req, res) => {
//   try {
//     const token = req.cookies?.access_token;
//     if (!token) {
//       return res
//         .status(401)
//         .json({ success: false, message: "No token provided" });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
//     const user = await userModel.findById(decoded.id).select("-password");

//     if (!user) {
//       return res
//         .status(404)
//         .json({ success: false, message: "User not found" });
//     }

//     res.status(200).json({ success: true, user });
//   } catch (error) {
//     res.status(500).json({ success: false, message: "Internal server error" });
//   }
// };

module.exports = {
  signUpController,
  loginController,
  logOutController,
  // authUser,
};
