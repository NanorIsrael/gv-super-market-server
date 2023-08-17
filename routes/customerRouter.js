const express = require("express");
const {
  addCustomer,
  getCustomerOrders,
  getCustomerOrdersById,
} = require("../controllers/customerController");
const router = express.Router();

const { verifyUser } = require("../middlewares/auth");

/* GET product listing. */
router.post("/", verifyUser, addCustomer);
router.get("/orders", verifyUser, getCustomerOrders);
router.get("/cart/:id", verifyUser, getCustomerOrdersById);
module.exports = router;
