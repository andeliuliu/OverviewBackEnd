const express = require("express");
const router = express.Router();
const controllers = require('/Users/andrewliu/Overview-Service-/Database/Postgres/Controllers/controllers.js')

//add product id in the url 

router.get(`/products`, controllers.getAllProducts)
router.get(`/product/:product_id`, controllers.getProductById)
router.get('/product/:product_id/styles', controllers.getStylesById)
router.post('/product/:product_id/addCart', controllers.addCart)
router.post('/product/:product_id/getCard', controllers.getCart)

// router.get('characteristics')

// router.get('features')

module.exports = router; 