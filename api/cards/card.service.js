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
  hisTrans: (data, callBack) => {
    pool.query(
      `select * from tb_transfer where trans_reciever = ? or trans_sender = ? ORDER BY trans_time desc`,
      [data.trans_reciever, data.trans_sender],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  selectCard: (card, callBack) => {
    pool.query(
      "select * from tb_card where card_number = ?",
      [card],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  selectNoti: (noti, callBack) => {
    pool.query(
      "SELECT * FROM `tb_notification` WHERE user_id = ? ORDER by login_time DESC LIMIT 1",
      [noti],
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
  tranCard: (data, callBack) => {
    pool.query(
      `UPDATE tb_card  SET card_money = card_money - ? WHERE card_number = ? 
      `,
      [data.menus, data.ac_memus],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  revCard: (data, callBack) => {
    pool.query(
      `UPDATE tb_card  SET card_money = card_money + ? WHERE card_number = ? 
      `,
      [data.add, data.ac_add],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  createTransfer: (data, callBack) => {
    pool.query(
      `INSERT into tb_transfer (user_id,trans_reciever,trans_sender,trans_money,trans_detail)
      VALUES(?,?,?,?,?)`,
      [
        data.user_id,
        data.trans_reciever,
        data.trans_sender,
        data.trans_money,
        data.trans_detail,
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
};
