const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users");
const verifyToken = require('../middlewares/verifyToken')
const { roleAdmin } = require('../middlewares/isAuthorization')

router
  .route("/")
  .get(verifyToken,roleAdmin,usersController.getAllUser)
  .post(verifyToken,roleAdmin,usersController.createNewUser);

router
  .route("/:id")
  .get(verifyToken,roleAdmin,usersController.getUserById)
  .patch(verifyToken,roleAdmin,usersController.updateNewUser)
  .delete(verifyToken,roleAdmin,usersController.deleteUser);

module.exports = router;
