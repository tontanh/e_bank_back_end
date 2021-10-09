require("dotenv").config();
const express = require("express");
const app = express();
const userRouter = require("./api/users/user.router");
const cardRouter = require("./api/cards/card.router");
const port = process.env.APP_PORT || 8000;
app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api/cards", cardRouter);

app.listen(port, () => {
  console.log("Running on port : ", port);
});
