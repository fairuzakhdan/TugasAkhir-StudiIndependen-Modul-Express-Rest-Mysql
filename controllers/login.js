const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  try {
    const { body } = req;
    if (!body.email || !body.password) {
      return res.status(400).json({
        status: "fail",
        message: "Tolong input dengan benar",
      });
    }
    const [email] = await User.getByEmail(body);
    if (email.length < 1) {
      return res.status(400).json({
        status: "fail",
        message: "Email tidak ditemukan",
      });
    }
    const [user] = await User.cariEmail(body);
    const userPassword = user[0].password
    bcrypt.compare(req.body.password, userPassword, (error, isMatch) => {
      if (error) {
        return res.status(401).send({
          message: 'Email or password is incorrect!'
        });
      }
      if (isMatch) {
        const data = {
          _id: user[0].id,
          username: user[0].username,
          email: user[0].email,
          isAdmin: user[0].isAdmin
        }
        const token = jwt.sign({ data }, 'iniSecretKey', {
          // token aktif 1 days / 1hari
          expiresIn: '1d',
        });
        return res.status(200).send({
          status: 'Success',
          message: 'Logged in!',
          token
        });
      }
      return res.status(401).send({
        msg: 'Email dan Password Anda Salah'
      });
    });
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = { login };
