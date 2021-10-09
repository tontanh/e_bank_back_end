const {
  create,
  getEmailAlready,
  getUserByUserEmail,
  createUserInfo,
  getTellAlready,
  getConnection,
} = require("./user.service");
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");

module.exports = {
  createUser: (req, res) => {
    const body = req.body;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
    create(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection errror",
        });
      }
      return res.status(200).json({
        success: 1,
        id: results.insertId,
        data: results,
      });
    });
  },
  createUserInfo: (req, res) => {
    const body = req.body;
    createUserInfo(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection errror",
        });
      }
      return res.status(200).json({
        success: 1,
        id: results.insertId,
        data: results,
      });
    });
  },
  getEmailAlready: (req, res) => {
    const email = req.params.email;
    getEmailAlready(email, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.status(200).json({
          success: true,
          message: "Email not Found",
        });
      }
      results.password = undefined;
      return res.status(500).json({
        success: false,
        data: results,
      });
    });
  },
  getTellAlready: (req, res) => {
    const tell = req.params.tell;
    getTellAlready(tell, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.status(200).json({
          success: true,
          message: "Tell not Found",
        });
      }

      results.password = undefined;
      return res.status(500).json({
        success: false,
        data: results,
      });
    });
  },
  getConnection: (req, res) => {
    const connect = req.params.connect;
    getConnection(connect, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.status(500).json({
          success: false,
          message: "Server off",
        });
      }

      results.password = undefined;
      return res.status(200).json({
        success: true,
        Server: results.con_status,
        data: results,
      });
    });
  },
  login: (req, res) => {
    const body = req.body;
    getUserByUserEmail(body.email, (err, results) => {
      if (err) {
        console.log(err);
      }
      if (!results) {
        return res.status(500).json({
          success: 0,
          data: "Invalid email or password 1",
        });
      }

      const result = compareSync(body.password, results.password);
      console.log("Password : ", result);
      if (result) {
        // results.password = undefined;
        const jsontoken = sign({ result: results }, process.env.JWT_KEY, {
          expiresIn: "1h",
        });
        return res.status(200).json({
          success: 1,
          message: "login successfully",
          id: results.user_id,
          token: jsontoken,
        });
      } else {
        return res.status(500).json({
          success: 0,
          data: "Invalid email or password ",
        });
      }
    });
  },
};
