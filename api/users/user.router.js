const { createUser, getEmailAlready, login } = require("./user.controller");
const router = require("express").Router();

router.post("/", createUser);
router.get("/:email", getEmailAlready);
router.post("/login", login);

module.exports = router;
