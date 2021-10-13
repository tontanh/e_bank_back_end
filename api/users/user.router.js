const {
  createUser,
  getEmailAlready,
  login,
  createUserInfo,
  getTellAlready,
  getConnection,
  getUserInfo,
} = require("./user.controller");
const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");

router.post("/", createUser);
router.get("/info/:uid", checkToken, getUserInfo);
router.get("/:email", getEmailAlready);
router.get("/tell/:tell", getTellAlready);
router.post("/login", login);
router.post("/register", createUserInfo);
router.get("/server/:connect", getConnection);

module.exports = router;
