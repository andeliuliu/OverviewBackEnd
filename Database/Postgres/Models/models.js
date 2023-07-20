const db = require('../db.js')

exports.findAllProducts = async (page, count) => {
    console.log("made it to findAllProducts model: ", page, count)

    page = page || 1;
    count = count || 20;

    if(page === 1) {
        var startCount = 1;
        var endCount = count; 
    } else {
        var startCount = (count * (page - 1)) + 1;
        var endCount = (count * page);
    }
    try{
        var params = [startCount, endCount]
        const productsQuery =  `SELECT * FROM products WHERE id BETWEEN $1 AND $2`;
        const productsResult = await db.query(productsQuery, params);
        return {
            products: productsResult.rows
        } 
    } catch (error) {
        // Handle the error
        console.error(error);
        throw error;
    }

} 

exports.findByProductID = async (productID) => {
    productID = productID || 12342
    console.log("made it to models: ", productID);
    var params = [productID]
    try {
        const productsQuery = `SELECT * FROM products WHERE id = $1`;
        const featuresQuery = `SELECT * FROM features WHERE product_id = $1`;
        // const reviewsQuery = `SELECT rating FROM reviews WHERE product_id = $1`; 
        // const characteristicsQuery = `SELECT * FROM characteristics WHERE product_id = $1`;
        // const stylesQuery = `SELECT * FROM styles WHERE productId = $1`;

        //set style default to 1, then immedaitely ask for find photos 

        const productsResult = await db.query(productsQuery, params);
        const featuresResult = await db.query(featuresQuery, params);
        // const characteristicsResult = await db.query(characteristicsQuery, params);
        // const reviewsResult = await db.query(reviewsQuery, params);
        // const stylesResult = await db.query(stylesQuery, params);
        const firstFeature = featuresResult.rows[0]
        const secondFeature = featuresResult.rows[1]

        console.log(firstFeature)

        productsResult.rows[0]['features'] = 
        [{"feature" : firstFeature['feature'], "value": firstFeature.value}, 
        {"feature" : secondFeature['feature'], "value" : secondFeature.value}]
        return {
            products: productsResult.rows,
            // characteristics: characteristicsResult.rows,
            // reviews: reviewsResult.rows,
            // styles: stylesResult.rows
        };
    } catch (error) {
        // Handle the error
        console.error(error);
        throw error;
    }
};

exports.StyleByProductId = async (productID) => {
    var params = [productID];
    try {
      const stylesQuery = `SELECT * FROM styles WHERE productId = $1`;
      const stylesResult = await db.query(stylesQuery, params);
      // console.log(stylesResult.rows);
  
      for (const style of stylesResult.rows) {
        delete style.productid;

        if (style.sale_price === 'null') {
          style.sale_price = '0';
        } else if (style.default_style === 1) {
          style.default_style = true;
        } else if (style.default_style === 0) {
          style.default_style = false;
        }
  
        const photoQuery = `SELECT * FROM photos WHERE style_id = $1`;
        const skusQuery = `SELECT * FROM skus WHERE style_id = $1`;

        const photoResults = await db.query(photoQuery, [style.id]);
        const skusResults = await db.query(skusQuery, [style.id])

        style["photos"] = photoResults.rows
        style["skus"] = skusResults.rows
      }
  
      return {
        "product_id": productID,
        "results": stylesResult.rows
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  exports.addCart = async (user_session, product_id, active) => {
    try {
        const addCartQuery = `INSERT INTO cart (user_session, product_id, active) VALUES ($1, $2, $3) RETURNING id`;
        const params = [user_session, product_id, active];

        const addCartResult = await db.query(addCartQuery, params);

        return {
            cart: addCartResult.rows[0]
        };
    } catch (err) {
        console.error(err);
        throw err;
    }
};

exports.getCart = () => {
    var queryStr = `SELECT * FROM cart`
    return db.queryStr(queryStr);
}