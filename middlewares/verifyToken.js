const jwt = require("jsonwebtoken");
const User = require("../models/User");

const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    res.status(403).json({
      status: "fail",
      message: "Incorrcet Credential",
    });
    return res;
  }
  try {
    const jwtToken = token.split(' ').pop();
    const data = jwt.verify(jwtToken, 'iniSecretKey');
    const [user] = await User.findById(data.data._id)
    if (!user) {
      res.status(404).json({
        status: 'fail',
        message: 'User Not Found',
      });
      return res;
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(403).json({
      status: 'fail',
      message: 'Incorrcet Credential',
    });
    return res;
  }
  return res;
};

module.exports = verifyToken
