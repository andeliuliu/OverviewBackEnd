const express = require("express");
const router = express.Router();
const controllers = require('./Controllers/controllers.js')

//add product id in the url 

router.get(`/products`, controllers.getAllProducts)
router.get(`/product/:product_id`, controllers.getProductById)
router.get('/product/:product_id/styles', controllers.getStylesById)
app.get("/loaderio-d07120ba7a9e99cf54edf563521476bc", (req, res) => 
    res.send("loaderio-d07120ba7a9e99cf54edf563521476bc")
)
router.post('/product/:product_id/addCart', controllers.addCart)
router.post('/product/:product_id/getCard', controllers.getCart)

// router.get('characteristics')

// router.get('features')

module.exports = router; 