import express, { Request, Response } from "express";
import cors from "cors";
import * as mysql from "mysql2/promise";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import path from "path";

dotenv.config();
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const ProductRouter = require("./routes/ProductsRoute");
app.use("/api/products", ProductRouter);
const CategoryRouter = require("./routes/CategoriesRoute");
app.use("/api/categories", CategoryRouter);
const CartRouter = require("./routes/CartsRoute");
app.use("/api/carts", CartRouter);

app.listen(process.env.REACT_APP_SERVER_PORT, () => {
  console.log(`Server running on port ${process.env.REACT_APP_SERVER_PORT}`);
});

module.exports = app;
