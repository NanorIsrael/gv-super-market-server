import user from "./../data/User";
import usersCollection from "../models/user";
import Auth from "../models/auth";
import tokenTypes from "../services/token";

const mongoose = require("mongoose");
const url = process.env.MONGO_URI;

describe("Users", () => {
  let Maple;

  beforeAll(async () => {
    try {
      // Connect to the MongoDB database
      await mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      Maple = {
        email: "maple@gvtech.com",
        password: "Mapleme@123",
        username: "Maple",
        last_name: "Tester",
      };

      user.email = Maple.email;
      user.username = Maple.username;
      user.password = Maple.password;
    } catch (error) {
      console.error("Error connecting to MongoDB:", error);
    }
  });

  beforeEach(async () => {
    await usersCollection.deleteMany({});
  });

  afterAll(async () => {
    await usersCollection.collection.drop();

    // Close the Mongoose connection after all tests are done
    await mongoose.disconnect();
  });

  it("says hello", async () => {
    const hello = "Hell from quiz app";
    expect(hello).toEqual("Hell from quiz app");
  });

  it("Add a new user Maple", async () => {
    const tester = user.getUser();
    const createdUser = await user.addUser(tester);

    expect(createdUser.username).toEqual(tester.username);
    expect(createdUser.email).toEqual(tester.email);
    expect(createdUser._id).not.toBeNull();
  });

  it("ensures Maples password is hashed", async () => {
    const tester = user.getUser();
    const createdUser = await user.addUser(tester);
    const userFromDb = await usersCollection.findById(createdUser._id);

    expect(createdUser.password).not.toEqual(tester.password);
    expect(createdUser.password).toEqual(userFromDb.password);
  });

  it("can find user Maple", async () => {
    const tester = user.getUser();
    const createdUser = await user.addUser(tester);
    const results = await user.getUserById(createdUser._id);

    expect(createdUser._id).not.toBeNull();
    expect(results).not.toBeNull();
    expect(createdUser._id).toEqual(results._id);
  });

  it("can find user Maple", async () => {
    const tester = user.getUser();
    const createdUser = await user.addUser(tester);
    const results = await user.getUserById(createdUser._id);

    expect(createdUser._id).not.toBeNull();
    expect(results).not.toBeNull();
    expect(createdUser._id).toEqual(results._id);
  });

  it("can update user Maple", async () => {
    const tester = user.getUser();
    const createdUser = await user.addUser(tester);
    const updatedUser = await user.updateUserById(createdUser._id, {
      email: "maple@trendAfrik.com",
    });
    const results = await user.getUserById(createdUser._id);

    expect(createdUser._id).not.toBeNull();
    expect(results).not.toBeNull();
    expect(updatedUser._id).toEqual(results._id);
    expect(updatedUser.email).toEqual(results.email);
  });

  it("can delete user Maple", async () => {
    const tester = user.getUser();
    const createdUser = await user.addUser(tester);
    const deletedUser = await user.deleteUser(createdUser._id);

    expect(createdUser._id).not.toBeNull();
    expect(deletedUser).not.toBeNull();
    expect(deletedUser._id).toEqual(createdUser._id);
  });

  it("can login user Maple", async () => {
    const tester = user.getUser();
    const createdUser = await user.addUser(tester);
    const results = await user.login(createdUser.email, tester.password);

    expect(createdUser._id).not.toBeNull();
    expect(results.accessToken).toBeTruthy();
    expect(Object.keys(results)).toHaveLength(4);
  });

  it("ensures user tokens were saved", async () => {
    const tester = user.getUser();
    const createdUser = await user.addUser(tester);
    const results = await user.login(createdUser.email, tester.password);

    expect(createdUser._id).not.toBeNull();
    expect(results.accessToken).toBeTruthy();
    const tokenDetails = await Auth.findOne({ token: results.accessToken });

    expect(results.accessToken).toEqual(tokenDetails.token);
    expect(tokenDetails.type).toEqual(tokenTypes.ACCESS);
    expect(Object.keys(results)).toHaveLength(4);
  });

  it("can logout user Maple", async () => {
    const tester = user.getUser();
    const createdUser = await user.addUser(tester);
    const tokens = await user.login(createdUser.email, tester.password);
    expect(tokens.accessToken).toBeTruthy();
    expect(Object.keys(tokens)).toHaveLength(4);

    const results = await user.logout(createdUser._id);
    const authResults = await Auth.findOne({ userId: createdUser._id });
    expect(authResults).toBeNull();
    expect(results.deletedCount).toEqual(2);
  });
});
