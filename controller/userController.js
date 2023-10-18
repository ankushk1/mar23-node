const User = require("../models/User");
const bcrypt = require("bcrypt");
const salt = 10;

exports.signUp = async (req, res) => {
  try {
    const existingUser = await User.findOne({
      email: req.body.email
    });

    // Checking if user is signed up already
    if (existingUser) {
      return res.json({ message: "User already exists, Try Signin" });
    }

    const encryptedPassword = bcrypt.hashSync(req.body.password, salt);

    await User.create({ ...req.body, password: encryptedPassword });

    return res.status(200).json({ message: "User created successfully" });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const existingUser = await User.findOne({
      email: req.body.email
    });

    // console.log(existingUser);
    //Checking if user is signed up or not, so he can login
    if (!existingUser) {
      return res
        .status(400)
        .json({ message: "User doesnot exists, please signup first" });
    }

    // we need to match the password and encrypted password
    const passwordMatched = bcrypt.compareSync(
      req.body.password,
      existingUser.password
    );
    
    console.log('passwordMatched ---->', passwordMatched)
    if (!passwordMatched) {
      return res.status(400).json({ message: "Invalid Password" });
    }

    return res.status(200).json({ message: "Login Success" });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};
