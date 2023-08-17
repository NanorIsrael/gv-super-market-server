const { productsDB } = require("../data/Product");

const getProducts = async (req, res, next) => {
  try {
    const results = await productsDB.getAllProduct();

    const products = results.map((item) => {
      const updatedItem = Object.assign({}, item._doc, {
        isAvailable: item.quantity >= 1,
      });
      return updatedItem;
    });

    res.status(200).json({
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Something might have gone wrong, Please try again later.",
    });
  }
};

const getProductById = async (req, res, next) => {
  const { id } = req.params;
  // do id validation
  try {
    const item = await productsDB.getProductById(id);
    console.log(item);
    res.status(200);
    res.json({
      item: { ...item, isAvailable: item.quantity >= 1 },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Something might have gone wrong, Please try again later.",
    });
  }
};

module.exports = { getProducts, getProductById };
