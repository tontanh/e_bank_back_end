const { createCard, getCard, createNoti } = require("./card.service");

module.exports = {
  createCard: (req, res) => {
    const body = req.body;
    createCard(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection errror",
        });
      }
      return res.status(200).json({
        success: 1,
        data: results,
      });
    });
  },
  getCard: (req, res) => {
    const uid = req.params.uid;
    getCard(uid, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.status(500).json({
          success: true,
          message: "data not Found",
        });
      }
      results.password = undefined;
      return res.status(200).json({
        success: false,
        card_id: results.card_id,
        card_money: results.card_money,
        card_number: results.card_number,
        data: results,
      });
    });
  },

  createNoti: (req, res) => {
    const body = req.body;
    createNoti(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection errror",
        });
      }
      return res.status(200).json({
        success: 1,
        data: results,
      });
    });
  },
};
