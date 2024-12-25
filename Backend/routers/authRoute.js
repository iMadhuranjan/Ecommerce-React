const expres = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  authMiddleWare,
} = require("../controllers/auth-controller/authController");
const router = expres.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/check-auth", authMiddleWare, async (req, res) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    message: "User is Authenticated",
    user,
  });
});

module.exports = router;
