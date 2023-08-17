import customer from "../data/Customer";
import Customer from "../models/Customer";
import categories from "../data/categories";
import { updateUserById } from "../data/User";
const { v4: uuidv4 } = require("uuid");

const mongoose = require("mongoose");
const url = process.env.MONGO_URI;

describe("Super market products", () => {
  let customerMaple;
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
    customerMaple = generatesTestCustomer();
  });

  beforeEach(async () => {
    await Customer.deleteMany({});
  });

  afterAll(async () => {
    await Customer.collection.drop();
    // Close the Mongoose connection after all tests are done
    await mongoose.disconnect();
  });

  it("adds customers", async () => {
    const result = await customer.addCustomer(customerMaple);
    console.log(result);
    expect(result._id).not.toBeNull();
  });

  it("gets orders made by acustomer", async () => {
    await customer.addCustomer(customerMaple);

    const result = await customer.getCustomerOrders(customerMaple.user_id);
    console.log(result);
    expect(result._id).not.toBeNull();
    expect(result.length).toBeGreaterThan(0);
  });
  //   it("gets all customers", async () => {
  //     await generateTestQuizes();
  //     const customers = await customer.getAllProduct();

  //     expect(customers.length).toBeGreaterThan(0);
  //   });

  //   it("gets all customers", async () => {
  //     const customers = await customer.getAllProduct();

  //     expect(customers.length).toBeGreaterThan(0);
  //   });
});

const generatesTestCustomer = () => ({
  line_items: [
    {
      product_id: new mongoose.Types.ObjectId(),
      quantity: 10,
      sku: "S",
    },
  ],
  user_id: new mongoose.Types.ObjectId(),
});
