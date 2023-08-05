const sequelize = require("../utils/database");
const Expense = require("../models/expense");
const User = require("../models/users");

const getUserLeaderBoard = async (req, res) => {
  try {
    const users = await User.findAll();
    console.log(users);
    const expenses = await Expense.findAll();
    console.log(expenses);
    const userAggregatedExpenses = {};
    expenses.forEach((expense) => {
      if (userAggregatedExpenses[expense.userId]) {
        userAggregatedExpenses[expense.userId] =
          userAggregatedExpenses[expense.userId] + expense.expenseamount;
      } else {
        userAggregatedExpenses[expense.userId] = expense.expenseamount;
      }
    });

    const userLeaderBoard = [];
    users.forEach((user) => {
      userLeaderBoard.push({
        name: user.name,

        total_cost: userAggregatedExpenses[user.id] || 0,
      });
    });
    // userLeaderBoard.sort((a, b) => b.amount - a.amount);
    userLeaderBoard.sort((a, b) => b.total_cost - a.total_cost);

    console.log(userLeaderBoard);

    console.log(userAggregatedExpenses);
    res.status(200).json(userLeaderBoard);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

module.exports = { getUserLeaderBoard };
