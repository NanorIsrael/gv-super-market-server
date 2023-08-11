require("dotenv").config();
const categories = require('../data/categories')
const { exit } = require("process");
const Product = require("../models/product");
// const user = require("../models/user");
// const quizResults = require("../models/quiz_results");
// const auth = require("../models/auth");
const mongoose = require("mongoose");
const url = process.env.MONGO_URI;
console.log(url)

async function generateTestProducts() {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }

  const productsDB = [
    {
      name: "belva biscuits",
      quantity: 10,
      price: 1.00,
      category: categories.BISCUITS,
      photo: "belva_biscuits_photo.jpeg"
    },
    {
      name: "arnotts biscuits",
      quantity: 10,
      price: 1.00,
      category: categories.BISCUITS,
      photo: "arnotts_bs_photo.jpeg"
    },
    {
      name: "hide & seek biscuits",
      quantity: 10,
      price: 1.00,
      category: categories.BISCUITS,
      photo: "hs_bs_photo.jpeg"
    },
    {
      name: "omo",
      quantity: 50,
      price: 3.00,
      category: categories.SOAPS_AND_DETERGENTS,
      photo: "omo_photo.jpeg",
      sku: "S"
    },
    {
      name: "omo",
      quantity: 50,
      price: 13.00,
      category: categories.SOAPS_AND_DETERGENTS,
      photo: "omo_photo.jpeg",
      sku: "M"
    },
    {
      name: "omo",
      quantity: 50,
      price: 23.00,
      category: categories.SOAPS_AND_DETERGENTS,
      photo: "omo_photo.jpeg",
      sku: "L"
    },
    {
      name: "coca-cola",
      quantity: 50,
      price: 3.00,
      category: categories.SOAPS_AND_DETERGENTS,
      photo: "can_coke_photo.jpeg",
      sku: "S"
    },
    {
      name: "coca-cola",
      quantity: 50,
      price: 3.00,
      category: categories.SOAPS_AND_DETERGENTS,
      photo: "coke_photo.jpeg",
      sku: "S"
    },
    {
      name: "coca-cola",
      quantity: 50,
      price: 13.00,
      category: categories.SOAPS_AND_DETERGENTS,
      photo: "coke_photo.jpeg",
      sku: "M"
    },
    {
      name: "coca-cola",
      quantity: 50,
      price: 23.00,
      category: categories.SOAPS_AND_DETERGENTS,
      photo: "coke_photo.jpeg",
      sku: "L"
    },

  ];

  try {
    await Product.collection.drop();

    for (let item of productsDB) {
      await Product.create(item);
    }
  } catch (error) {
    console.log(error);
  }

  setInterval(async () => {
    await mongoose.disconnect();
  }, 10000);
}

generateTestProducts()
  .then((result) => {
    console.log("Products Successfully added.");
    exit(0);
  })
  .catch((err) => {
    console.error("Script run failed");
    exit(1);
  });
