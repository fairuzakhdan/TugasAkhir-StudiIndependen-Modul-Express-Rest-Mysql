const Coffee = require("../models/Coffee");
const jwt = require('jsonwebtoken')

const isAuthorCoffee = async (req, res, next) => {
  try {
    const { params } = req;
    const [coffee] = await Coffee.getCoffeeById(params);
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, 'iniSecretKey');
    const author = decoded.data._id
    // console.log();
    if (!coffee[0] || coffee[0].author !== author) {
      return res.status(401).json({
        status: 'fail',
        message: 'Not Authorized',
      });
    }
    next();
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      status: 'error',
      message: 'Internal Server Error',
    });
  }
};

const roleAdmin = (req, res, next) => {
  if (req.user[0].isAdmin === 'false') {
    res.status(403).json({
      status: 'Fail',
      message: 'Anda tidak memiliki Akses'
    })
    return res;
  }
  next()
}



module.exports = { isAuthorCoffee, roleAdmin};