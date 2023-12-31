const express = require("express");
const router = express.Router();
const {
  getProducts,
  getProductById,
} = require("../controllers/productController");
// const { verifyUser } = require("../middlewares/auth");
// const UserDataSource = require("../controllers/Users");
// const Auth = require("../models/auth");
// const tokenTypes = require("../services/token");
// const authService = require("../services/tokenService");
// const user = new UserDataSource();

/* GET product listing. */
router.get("/", async (req, res) => await getProducts(req, res));
router.get("/:id", async (req, res) => await getProductById(req, res));

module.exports = router;
