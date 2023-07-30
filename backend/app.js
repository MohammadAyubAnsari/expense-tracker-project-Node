const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const errorController = require("./controllers/error");

const sequelize = require("./utils/database");

var cors = require("cors");
const app = express();

app.use(cors());

app.set("view engine", "ejs");
app.set("views", "views");

const userRoutes = require("./routes/user");

app.use(bodyParser.json({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

const { userInfo } = require("os");

app.use("/user", userRoutes);
app.use(errorController.get404);

sequelize
  .sync()
  .then((result) => {
    app.listen(3000);
  })
  .catch((err) => console.log(err));
