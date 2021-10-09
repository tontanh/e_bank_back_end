const pool = require("../../config/database");

module.exports = {
  createCard: (data, callBack) => {
    pool.query(
      `INSERT into tb_card (user_id,card_money,card_name,card_number)
      VALUES(?,?,?,?)`,
      [data.user_id, data.card_money, data.card_name, data.card_number],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
};
