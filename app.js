require("dotenv").config();
const express = require("express");
const app = express();
const userRouter = require("./api/users/user.router");
const port = process.env.APP_PORT || 3000;
app.use(express.json());

app.use("/api/users", userRouter);

app.listen(port, () => {
  console.log("Running on port :", port);
});
