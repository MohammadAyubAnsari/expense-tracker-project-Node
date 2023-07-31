const User = require("../models/users");

function isStringInvalid(string) {
  if (string == undefined || string.length === 0) {
    return true;
  } else {
    false;
  }
}

exports.signUp = async (req, res, next) => {
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

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (isStringInvalid(email) || isStringInvalid(password)) {
      return res
        .status(400)
        .json({ message: "Email id or password is missing ", success: false });
    }
    console.log(password);
    const user = await User.findAll({ where: { email } });
    if (user.length > 0) {
      if (user[0].password === password) {
        res
          .status(200)
          .json({ success: true, message: "User logged in successfully" });
      } else {
        return res
          .status(400)
          .json({ success: false, message: "Password is incorrect" });
      }
    } else {
      return res
        .status(404)
        .json({ success: false, message: "User does not exist" });
    }
  } catch (err) {
    res.status(500).json({ message: err, success: false });
  }
};
