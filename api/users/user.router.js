const {
  createUser,
  getEmailAlready,
  login,
  createUserInfo,
  getTellAlready,
  getConnection,
  getUserInfo,
  updateUsers,
  // sentAuth,
  // receivedAuthPhone,
} = require("./user.controller");
const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");

router.post("/", createUser);
router.post("/update/users", updateUsers);
router.get("/info/:uid", checkToken, getUserInfo);
router.get("/:email", getEmailAlready);
router.get("/tell/:tell", getTellAlready);
router.post("/login", login);
router.post("/register", createUserInfo);
router.get("/server/:connect", getConnection);
// router.get("/sent_auth/phone", sentAuth);
// router.get("/verify_auth/phone", receivedAuthPhone);
module.exports = router;
