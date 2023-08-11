import  {ProductDataSource} from "../data/Product";
import Product from "../models/product";
import categories from "../data/categories";
const mongoose = require("mongoose");
const url = process.env.MONGO_URI;

describe("Super market products", () => {

  let ProductSource
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
    //   quizQuestions: [
    //     {
    //       questionNumber: 1,
    //       question: "Which of the following is the capital of Ghana.",
    //       question_options: ["Temale", "Kumasi", "Accra", "None of the above"],
    //       question_answer: "Accra",
    //       selectedAnswer: "Kumasi",
    //     },
    //     {
    //       questionNumber: 2,
    //       question: "In which year did Ghana became independent.",
    //       question_options: ["1997", "19957", "1967", "None of the above"],
    //       selectedAnswer: "1957",
    //     },
    //   ],
    //   accountId: new mongoose.Types.ObjectId(),
    //   status: quizeStatus.COMPLETED,
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

//   it("gets one quizes", async () => {
//     await generateTestQuizes();
//     const quizes = await QuizDataSource.getQuizQuestion();

//     expect(quizes).not.toBeNull();
//     expect(quizes.question_number).toBe(1);
//     expect(Object.keys(quizes.question_options)).toHaveLength(4);
//   });

  it("gets all products", async () => {
    await generateTestQuizes();
    const product = await ProductSource.getAllProduct();

    expect(product.length).toBeGreaterThan(0);
    // expect(quizes[0].question_options).toHaveLength(4);
  });

//   it("processes quiz results", async () => {
//     await generateTestQuizes();

//     const score = await QuizResultsDataSource.processScore(
//       quizTaker.quizQuestions,
//     );

//     await QuizResultsDataSource.processQuizResults(
//       quizTaker.status,
//       score,
//       quizTaker.accountId,
//       quizTaker.quizQuestions,
//     );
//     const queryUserQuizResults = await QuizResultsDataSource.getUserQuizResults(
//       quizTaker.accountId,
//     );

//     expect(queryUserQuizResults.userId).toEqual(quizTaker.accountId);
//     expect(queryUserQuizResults.quiz).toHaveLength(
//       quizTaker.quizQuestions.length,
//     );
//     expect(queryUserQuizResults.score).toEqual(10);
//   });
});

const generateTestQuizes = async () => {
    const testProducts = [
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

  for (let item of testProducts) {
    await Product.create(item);
  }
};
