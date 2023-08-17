import { ProductDataSource } from "../data/Product";
import Product from "../models/product";
import categories from "../data/categories";
const mongoose = require("mongoose");
const url = process.env.MONGO_URI;

describe("Super market products", () => {
  let ProductSource;
  beforeAll(async () => {
    try {
      // Connect to the MongoDB database
      await mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    } catch (error) {
      console.error("Error connecting to MongoDB:", error);
    }
    ProductSource = new ProductDataSource();
    // products = {

    // };
  });

  beforeEach(async () => {
    await Product.deleteMany({});
  });

  afterAll(async () => {
    await Product.collection.drop();
    // Close the Mongoose connection after all tests are done
    await mongoose.disconnect();
  });

  it("gets all products", async () => {
    await generateTestProducts();
    const product = await ProductSource.getAllProduct();

    expect(product.length).toBeGreaterThan(0);
  });

  it("updates a single product", async () => {
    await generateTestProducts();
    const products = await ProductSource.getAllProduct();
    const testProduct = products[0];

    await ProductSource.updateProductById(testProduct._id, {
      quantity: testProduct.quantity - 1,
    });
    const updatedProduct = await ProductSource.getProductById(testProduct._id);
    expect(products.length).toBeGreaterThan(0);
    expect(updatedProduct.quantity).toEqual(testProduct.quantity - 1);
  });
});

const generateTestProducts = async () => {
  const testProducts = [
    {
      name: "happy cracks",
      quantity: 10,
      price: 1.0,
      category: categories.BISCUITS,
      photo: "/logo515.png",
    },
    {
      name: "omo",
      quantity: 50,
      price: 3.0,
      category: categories.SOAPS_AND_DETERGENTS,
      photo: "/logo515.png",
      sku: "S",
    },
    {
      name: "omo",
      quantity: 50,
      price: 13.0,
      category: categories.SOAPS_AND_DETERGENTS,
      photo: "/logo515.png",
      sku: "M",
    },
    {
      name: "omo",
      quantity: 50,
      price: 23.0,
      category: categories.SOAPS_AND_DETERGENTS,
      photo: "/logo515.png",
      sku: "L",
    },
    {
      name: "coca-cola",
      quantity: 50,
      price: 3.0,
      category: categories.SOAPS_AND_DETERGENTS,
      photo: "/logo515.png",
      sku: "s",
    },
    {
      name: "coca-cola",
      quantity: 50,
      price: 3.0,
      category: categories.SOAPS_AND_DETERGENTS,
      photo: "/logo515.png",
      sku: "S",
    },
    {
      name: "coca-cola",
      quantity: 50,
      price: 13.0,
      category: categories.SOAPS_AND_DETERGENTS,
      photo: "/logo515.png",
      sku: "M",
    },
    {
      name: "coca-cola",
      quantity: 50,
      price: 23.0,
      category: categories.SOAPS_AND_DETERGENTS,
      photo: "/logo515.png",
      sku: "L",
    },
  ];

  for (let item of testProducts) {
    await Product.create(item);
  }
};
