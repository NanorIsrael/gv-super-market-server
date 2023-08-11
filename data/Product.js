const Product = require("../models/product");
// const Auth = require("../models/auth");
// const bcrypt = require("bcrypt");
// const { generateAuthTokens } = require("./../services/tokenService");


class ProductDataSource {
    constructor() {

    }

    async getAllProduct() {
        return await Product.find({})
    }
}

const productsDB = new ProductDataSource()
module.exports = {ProductDataSource, productsDB}