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
      name: "happy cracks",
      quantity: 10,
      price: 1.00,
      category: categories.BISCUITS,
      photo: "/logo515.png"
    },
    {
      name: "omo",
      quantity: 50,
      price: 3.00,
      category: categories.SOAPS_AND_DETERGENTS,
      photo: "/logo515.png",
      sku: "S"
    },
    {
      name: "omo",
      quantity: 50,
      price: 13.00,
      category: categories.SOAPS_AND_DETERGENTS,
      photo: "/logo515.png",
      sku: "M"
    },
    {
      name: "omo",
      quantity: 50,
      price: 23.00,
      category: categories.SOAPS_AND_DETERGENTS,
      photo: "/logo515.png",
      sku: "L"
    },
    {
      name: "coca-cola",
      quantity: 50,
      price: 3.00,
      category: categories.SOAPS_AND_DETERGENTS,
      photo: "/logo515.png",
      sku: "s"
    },
    {
      name: "coca-cola",
      quantity: 50,
      price: 3.00,
      category: categories.SOAPS_AND_DETERGENTS,
      photo: "/logo515.png",
      sku: "S"
    },
    {
      name: "coca-cola",
      quantity: 50,
      price: 13.00,
      category: categories.SOAPS_AND_DETERGENTS,
      photo: "/logo515.png",
      sku: "M"
    },
    {
      name: "coca-cola",
      quantity: 50,
      price: 23.00,
      category: categories.SOAPS_AND_DETERGENTS,
      photo: "/logo515.png",
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
