const express = require("express");
const router = express.Router();
const registerController = require('../controllers/register')

router.route('/').post(registerController.register)

module.exports = router