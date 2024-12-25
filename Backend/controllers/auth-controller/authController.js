const bcrypt = require("bcryptjs");
const User = require("../../models/User");
const jwt = require("jsonwebtoken");
const { log } = require("console");

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const passwordHash = await bcrypt.hash(password, 10);

    const alreadyUserName = await User.findOne({ username });
    const alreadyEmail = await User.findOne({ email });

    if (alreadyUserName) {
      return res.json({
        message: "Username alredy Exists",
      });
    }

    if (alreadyEmail) {
      return res.json({
        message: " This Email is Already in Use",
      });
    }

    const newUser = new User({
      username,
      email,
      password: passwordHash,
    });

    await newUser.save();

    res.status(200).json({
      message: "Successfully Registered",
      success: true,
    });
  } catch (err) {
    res.status(400).json({
      message: "Something Went Wrong",
      success: false,
    });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const loggedInUser = await User.findOne({ email: email });

  if (!loggedInUser) {
    return res.json({
      success: false,
      message: "Invalid Email Address",
    });
  }

  const comparePassword = await bcrypt.compare(password, loggedInUser.password);

  if (!comparePassword) {
    return res.json({
      success: false,
      message: "Invalid Password",
    });
  }

  const token = await jwt.sign(
    {
      id: loggedInUser._id,
      role: loggedInUser.role,
      email: loggedInUser.email,
      username:loggedInUser.username
    },
    "Ritesh@709",
    {
      expiresIn: "30mins",
    }
  );

  res.cookie("token", token).json({
    success: true,
    message: "Logged In Successfully",
    user: {
      id: loggedInUser._id,
      email: loggedInUser.email,
      role: loggedInUser.role,
      username:loggedInUser.username
    },
  });
};

const logoutUser = (req, res) => {
  res.clearCookie("token").json({
    success: true,
    message: "Logout Successfull",
  });
};

const authMiddleWare = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({
      success: false,
      message: "Unauthorized user",
      // isloading: true,
    });
  }

  try {
    const decodedToken = jwt.verify(token, "Ritesh@709", {
      httpOnly: true,
      secure: false,
    });
    req.user = decodedToken;
    next();
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: "Unauthorized user",
    });
  }
  next();
  // console.log(token);
};

module.exports = { registerUser, loginUser, logoutUser, authMiddleWare };
