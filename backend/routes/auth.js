const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fetchUser = require("../middlewares/fetchUser");

// @route POST "/api/auth"
// @desc "Add User"
router.post(
  "/register",
  [
    body("name", "Please enter a name.").notEmpty(),
    body("email", "Please enter correct email format.").isEmail(),
    body("password", "Password must be 7 digit long.").isLength({ min: 7 }),
  ],
  async (req, res) => {
    const { name, email, password } = req.body;

    // Checking for validation array
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // checking is user already exists
      const user = await User.findOne({ email: email });
      if (user) {
        return res
          .status(400)
          .json({ error: "Please login instead of register yourself." });
      }
      // if not existed creating new user
      const securePassword = await bcrypt.hash(password, 10);
      const newUser = await User({
        name: name,
        email: email,
        password: securePassword,
      });
      newUser.save();

      // JWT sign
      const data = {
        user: {
          id: newUser.id,
        },
      };
      const authToken = jwt.sign(data, "itisasecretkey");

      return res.json({
        authToken: authToken,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Internal Error Occured." });
    }
  }
);

// @route /login
// @desc login a user
router.post(
  "/login",
  [
    body("email", "Please enter correct email format.").isEmail(),
    body("password", "Password must be 7 digit long.").isLength({ min: 7 }),
  ],
  async (req, res) => {
    // Checking for validation array
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      // checking exsistence of user
      const user = await User.findOne({ email: email });
      // if user not exist
      if (!user) {
        return res
          .status(400)
          .json({ error: "Please login with correct cerdentials." });
      }
      // comparing password
      const comparePasswordResult = await bcrypt.compare(
        password,
        user.password
      );
      // if password not matched
      if (!comparePasswordResult) {
        return res
          .status(400)
          .json({ error: "Please login with correct cerdentials." });
      }

      // jwt sign
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, "itisasecretkey");
      return res.json({
        authToken: authToken,
      });
    } catch (error) {
      return res.status(500).json({error : "Internal Error Occured"});
    }
  }
);

// @route /userDetails
// @desc give logged in user details
router.post("/userDetails", fetchUser, async (req, res) => {
  try {
    // finding user
    const user = await User.findById(req.user.id).select("-password");
    return res.json(user);
  } catch (error) {
    return res.status(500).json("Internal Error Occured");
  }
});

module.exports = router;
