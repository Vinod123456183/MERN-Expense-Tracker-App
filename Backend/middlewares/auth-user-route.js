const express = require("express");
const router = express.Router();
const userModel = require("../models/user-model");
const { verifyToken } = require("../middleware/verifyToken");

router.get("/me", verifyToken, async (req, res) => {
  try {
    const userId = req.user.id; // from verifyToken middleware

    const user = await userModel.findById(userId).select("-password");
    if (!user) {
    return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

module.exports = router;
