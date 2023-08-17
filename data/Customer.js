const Customer = require("../models/customer");

class CustomerDataSource {
  constructor() {}

  async getAllCustomers() {
    return await Customer.find({});
  }

  async getCustomerById(id) {
    return await Customer.findOne({ _id: id });
  }
  async getCustomerOrders(userId) {
    return await Customer.find({ user_id: userId });
  }
  async addCustomer(customer) {
    return await Customer.create(customer);
  }
}

const customer = new CustomerDataSource();
module.exports = customer;
