const {
  createCard,
  getCard,
  createNoti,
  selectCard,
  tranCard,
  revCard,
  createTransfer,
} = require("./card.service");

module.exports = {
  createTransfer: (req, res) => {
    const body = req.body;
    createTransfer(body, (err, results) => {
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
      return res.status(200).json(results);
    });
  },
  selectCard: (req, res) => {
    const card = req.params.card;
    selectCard(card, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.status(500).json({
          success: true,
          message: "data not Found1",
        });
      }
      // results.password = undefined;
      return res.status(200).json(results);
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
  tranCard: (req, res) => {
    const body = req.body;
    tranCard(body, (err, results) => {
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
  revCard: (req, res) => {
    const body = req.body;
    revCard(body, (err, results) => {
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
