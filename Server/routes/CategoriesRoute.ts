import express from "express";

const CategoriesController = require("../controllers/CategoriesController");
const router = express.Router();

router.get("/", CategoriesController.getAllCategories);
router.get("/:id", CategoriesController.getCategoryById);
router.get("/:id/products", CategoriesController.getProductsByCategory);

module.exports = router;
