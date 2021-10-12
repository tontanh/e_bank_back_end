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

  getCard: (uid, callBack) => {
    pool.query(
      "select * from tb_card where user_id = ?",
      [uid],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },

  createNoti: (data, callBack) => {
    pool.query(
      `INSERT into tb_notification (user_id,noti_token)
      VALUES(?,?)`,
      [data.user_id, data.noti_token],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
};
