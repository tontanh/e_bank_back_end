const {
  create,
  getEmailAlready,
  getUserByUserEmail,
  createUserInfo,
  getTellAlready,
  getConnection,
  getUserInfo,
  updateUsers,
} = require("./user.service");
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const client = require("twilio")(process.env.ACC_ID, process.env.AUTH_TOKEN);
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
      console.log("Login 1 More && success : ", result);
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
  getUserInfo: (req, res) => {
    const uid = req.params.uid;
    getUserInfo(uid, (err, results) => {
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
  updateUsers: (req, res) => {
    const body = req.body;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
    updateUsers(body, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.status(200).json({
        success: 1,
        message: "update successfully",
      });
    });
  },
  sentAuth: (req, res) => {
    if (req.query.phonenumber) {
      client.verify
        .services(process.env.SERVICE_ID)
        .verifications.create({
          to: `+${req.query.phonenumber}`,
          channel: req.query.channel === "call" ? "call" : "sms",
        })
        .then((data) => {
          res.status(200).send({
            message: "Verification is sent!!",
            phonenumber: req.query.phonenumber,
            // data
          });
        });
    } else {
      res.status(400).send({
        message: "Wrong phone number :(",
        phonenumber: req.query.phonenumber,
        // data
      });
    }
  },
  receivedAuthPhone: (req, res) => {
    if (req.query.phonenumber && req.query.code.length === 6) {
      client.verify
        .services(process.env.SERVICE_ID)
        .verificationChecks.create({
          to: `+${req.query.phonenumber}`,
          code: req.query.code,
        })
        .then((data) => {
          if (data.status === "approved") {
            res.status(200).send({
              message: "User is Verified!!",
              // data
            });
          } else {
            res.status(400).send({
              message: "Wrong phone number or code :(",
              phonenumber: req.query.phonenumber,
              // data
            });
          }
        });
    } else {
      res.status(400).send({
        message: "Wrong phone number or code :(",
        phonenumber: req.query.phonenumber,
        // data
      });
    }
  },
};
