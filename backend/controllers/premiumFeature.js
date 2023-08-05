const sequelize = require("../utils/database");
const Expense = require("../models/expense");
const User = require("../models/users");

const getUserLeaderBoard = async (req, res) => {
  try {
    const LeaderboardofUsers = await User.findAll({
      attributes: [
        "id",
        "name",
        [sequelize.fn("sum", sequelize.col("expenseamount")), "total_cost"],
      ],
      include: [
        {
          model: Expense,
          attributes: [],
        },
      ],
      group: ["user.id"],
      order: [[sequelize.col("total_cost"), "DESC"]],
    });

    res.status(200).json(LeaderboardofUsers);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

module.exports = { getUserLeaderBoard };
