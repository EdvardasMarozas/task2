import express from "express";

const ProductsController = require("../controllers/ProductsController");
const router = express.Router();

router.get("/", ProductsController.getAllProducts);
router.get("/:id", ProductsController.getProductById);

module.exports = router;
