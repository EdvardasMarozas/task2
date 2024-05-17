import express from "express";

const CartsController = require("../controllers/CartsController");
const router = express.Router();

router.get("/", CartsController.getAllCarts);
router.get("/:id", CartsController.getCartById);
router.post("/:id/decrement", CartsController.decrementQuantity);
router.post("/:id/increment", CartsController.incrementQuantity);
router.delete("/:id/remove", CartsController.deleteSpecificProducFromCart);

module.exports = router;
