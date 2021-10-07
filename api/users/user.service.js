const pool = require("../../config/database");

module.exports = {
  create: (data, callBack) => {
    pool.query(
      `insert into tb_users ( email, password) 
                values(?,?)`,
      [data.email, data.password],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  createUserInfo: (data, callBack) => {
    pool.query(
      `INSERT into tb_user_info (user_id,userinfo_firstname_la,userinfo_lastname_la,userinfo_firstname_en,userinfo_lastname_en,userinfo_tell)
      VALUES(?,?,?,?,?,?)`,
      [
        data.user_id,
        data.userinfo_firstname_la,
        data.userinfo_lastname_la,
        data.userinfo_firstname_en,
        data.userinfo_lastname_en,
        data.userinfo_tell,
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  getEmailAlready: (email, callBack) => {
    pool.query(
      "select * from tb_users where email = ?",
      [email],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  getUserByUserEmail: (email, callBack) => {
    pool.query(
      "select * from tb_users where email = ?",
      [email],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
};
