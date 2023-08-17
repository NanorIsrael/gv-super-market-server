const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  customer_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Customer",
  },
});

const Customer = mongoose.model("Order", orderSchema);

module.exports = Customer;
