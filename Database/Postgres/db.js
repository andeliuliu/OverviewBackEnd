//product:            id, name, slogan, description, category, default_price

//features:           id, product_id, feature, value

//characteristics:    id, product_id, name

//styles:             id, productid, name, sale_price, original_price, default_style

//skus:               id, styleid, size, quantity

//photos:             id, styleid, url, thumbbnail_url

//reviews:            id,

// cart:              id, user_session, product_id, active
//PG_USER = postgres


const {Client} = require('pg')
const dotenv = require('dotenv');
dotenv.config();


const db = new Client({
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  user: process.env.PG_USER,
  password: process.env.PG_PASS,
  database: process.env.PG_DB
});
 
db.connect();
module.exports = db;