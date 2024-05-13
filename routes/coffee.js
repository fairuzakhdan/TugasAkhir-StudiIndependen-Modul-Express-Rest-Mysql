const express = require("express");
const router = express.Router();
const coffeeController = require("../controllers/coffee");
const verifyToken = require("../middlewares/verifyToken");
const { isAuthorCoffee } = require("../middlewares/isAuthorization");

router
  .route("/")
  .get(verifyToken, coffeeController.getAllCoffee)
  .post(verifyToken, coffeeController.createNewCoffee);
router
  .route("/:id")
  .get(verifyToken, coffeeController.getCoffeeById)
  .patch(verifyToken, isAuthorCoffee, coffeeController.updateNewCofffe)
  .delete(verifyToken,isAuthorCoffee, coffeeController.deleteCoffeeById);
module.exports = router;
