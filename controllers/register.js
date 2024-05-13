// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
const User = require("../models/User");

const register = async (req, res) => {
  try {
    const { body } = req;
    if (!body.username || !body.password || !body.email) {
      res.status(400).json({
        status: "fail",
        message: "Tolong input dengan benar",
      });
      return res;
    }
    const [isEmailUsed] = await User.getByEmail(body)
    if (isEmailUsed.length >= 1) {
      res.status(404).json({
        status: "fail",
        message: "Email sudah ada",
      });
      return res;
    }
    await User.registerUser(body);
    res.status(201).json({
      status: "success",
      message: "Users berhasil ditambahkan",
    });
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = { register };
