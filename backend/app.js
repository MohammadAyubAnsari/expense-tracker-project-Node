const path = require("path");

const express = require("express");
const User = require("./models/users");
const Expense = require("./models/expense");
const sequelize = require("./utils/database");
var cors = require("cors");
const app = express();
const userRoutes = require("./routes/user");
const expenseRoutes = require("./routes/expense");

app.use(cors());
app.use(express.json());

app.use("/user", userRoutes);
app.use("/expense", expenseRoutes);

User.hasMany(Expense);
Expense.belongsTo(User);

sequelize
  .sync()
  .then((result) => {
    app.listen(3000);
  })
  .catch((err) => console.log(err));
