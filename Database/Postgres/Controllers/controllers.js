
const models = require('../Models/models.js')
exports.getAllProducts = async (req, res) => {
    console.log("made it to getAllProducts")
    console.log("page and count: ", req.body.page, req.body.count);
    const page = req.body.page
    const count = req.body.count

    try {
        const results = await models.findAllProducts(page, count);
        console.log(results);
        res.send(results);
    } catch (err) {
        console.error(err);
    }
}
exports.getProductById = async (req, res) => {
    console.log(req.body);

    try {
        const results = await models.findByProductID(req.body.productID);
        console.log(results);
        res.send(results);
    } catch (err) {
        console.error(err);
    }
}

exports.getStylesById = async (req, res) => {
    console.log(req.body);

    try {
        const results = await models.StyleByProductId(req.body.productID);
        console.log(results);
        res.send(results);
    } catch (err) {
        console.error(err);
    }
}

exports.addCart = async (req, res) => {
    console.log("in the add Carts")
    const {user_session, product_id, active} = req.body

    try {
        const results = await models.addCart(user_session, product_id, active);
        console.log(results);
        res.send(results);
    } catch (err) {
        console.error(err);
    }
}

exports.getCart = async(req, res) => {
    console.log("in the add Carts")

    try {
        const results = await models.getCart();
        console.log(results);
        res.send(results);
    } catch (err) {
        console.error(err);
    }
}