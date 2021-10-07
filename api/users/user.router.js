const {
  createUser,
  getEmailAlready,
  login,
  createUserInfo,
} = require("./user.controller");
const router = require("express").Router();

router.post("/", createUser);
router.get("/:email", getEmailAlready);
router.post("/login", login);
router.post("/register", createUserInfo);

module.exports = router;
