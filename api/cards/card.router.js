const { createCard } = require("./card.controller");
const router = require("express").Router();

router.post("/create", createCard);

module.exports = router;
