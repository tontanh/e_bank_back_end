const { createCard, getCard, createNoti } = require("./card.controller");
const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");

router.post("/create", createCard);
router.post("/notification", createNoti);
router.get("/show/:uid", checkToken, getCard);

module.exports = router;
