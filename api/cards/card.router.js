const {
  createCard,
  getCard,
  createNoti,
  selectCard,
  tranCard,
  revCard,
  createTransfer,
} = require("./card.controller");
const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");

router.post("/create", createCard);
router.post("/notification", createNoti);
router.get("/show/:uid", checkToken, getCard);
router.get("/select/:card", selectCard);
router.patch("/tran_card", checkToken, tranCard);
router.patch("/rev_card", checkToken, revCard);
router.post("/create_tran", checkToken, createTransfer);

module.exports = router;
