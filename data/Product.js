const Product = require("../models/product");
// const Auth = require("../models/auth");
// const bcrypt = require("bcrypt");
// const { generateAuthTokens } = require("./../services/tokenService");

class ProductDataSource {
  constructor() {}

  async getAllProduct() {
    return await Product.find({});
  }

  async getProductById(id) {
    return await Product.findOne({ _id: id });
  }
  async updateProductById(id, updatedItem) {
    const result = await Product.updateOne({ _id: id }, updatedItem);
    return result;
  }
}

const productsDB = new ProductDataSource();
module.exports = { ProductDataSource, productsDB };
