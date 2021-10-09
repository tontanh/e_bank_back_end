const {
  createUser,
  getEmailAlready,
  login,
  createUserInfo,
  getTellAlready,
  getConnection,
} = require("./user.controller");
const router = require("express").Router();

router.post("/", createUser);
router.get("/:email", getEmailAlready);
router.get("/tell/:tell", getTellAlready);
router.post("/login", login);
router.post("/register", createUserInfo);
router.get("/server/:connect", getConnection);

module.exports = router;
