const { createCard } = require("./card.service");

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
};
