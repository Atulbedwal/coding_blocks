const router = require("express").Router();
const { registerUser, loginUser, getProfile } = require("../controllers/userController");
const passport = require("passport");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", passport.authenticate("jwt", { session: false }), getProfile);

module.exports = router;
