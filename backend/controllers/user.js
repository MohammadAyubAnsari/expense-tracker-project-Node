const User = require("../models/users");

function isStringInvalid(string) {
  if (string == undefined || string.length === 0) {
    return true;
  } else {
    false;
  }
}

exports.postSignUpDetails = async (req, res, next) => {
  try {
    const { name, email, password, phNo } = req.body;

    if (
      isStringInvalid(name) ||
      isStringInvalid(email) ||
      isStringInvalid(password) ||
      isStringInvalid(phNo)
    ) {
      return res.status(400).json({ err: "Bad parameters" });
    }

    const data = await User.create({ name, email, password, phNo });
    res.status(201).json({ newExpenseDetail: data });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};
