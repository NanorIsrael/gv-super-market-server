const customer = require("../data/Customer");
const { productsDB } = require("../data/Product");

const addCustomer = async (req, res, next) => {
  try {
    //   do validation here

    const cart = req.body;
    const customerId = req.accountId;
    if (!customerId) {
      throw new Error("account id not found");
    }
    const customerData = {
      line_items: cart,
      user_id: customerId,
    };
    const results = await customer.addCustomer(customerData);
    if (results) {
      const products = await productsDB.getAllProduct();

      for (let item of products) {
        for (let prod of cart) {
          if (prod.product_id == item._id) {
            item.quantity -= prod.quantity;
            productsDB.updateProductById(item._id, item);
          }
        }
      }
    }
    res.status(200).json({
      results,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Something might have gone wrong, Please try again later.",
    });
  }
};
const getCustomerOrders = async (req, res, next) => {
  try {
    //   do validation here

    const accountId = req.accountId;
    if (!accountId) {
      throw new Error("account id not found");
    }

    const results = await customer.getCustomerOrders(accountId);

    const orders = [];
    for (let product of results) {
      orders.push({
        order_id: product._id,
        line_items: product.line_items,
        order_date: product.createdAt,
      });
    }

    res.status(200).json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Something might have gone wrong, Please try again later.",
    });
  }
};

const getCustomerOrdersById = async (req, res, next) => {
  try {
    //   do validation here

    const { id } = req.params;
    // if (!accountId) {
    //     throw new Error("account id not found")
    // }

    console.log(id);
    const cart = await customer.getCustomerById(id);

    const order = {
      order_id: cart._id,
      line_items: cart.line_items,
      order_date: cart.createdAt,
    };

    res.status(200).json(order);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Something might have gone wrong, Please try again later.",
    });
  }
};

module.exports = { addCustomer, getCustomerOrders, getCustomerOrdersById };
