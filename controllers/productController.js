const {productsDB} = require('../data/Product');


const getProducts = async (req, res, next) => {
    const results = await productsDB.getAllProduct()

    res.status(200)
    res.json({
        products: results
    })
}

module.exports = getProducts