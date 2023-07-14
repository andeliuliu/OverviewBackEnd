const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    CategoryName: {
        type: String
    }
})

const StylesSchema = new mongoose.Schema({
    StyleName: {
        type: String
    },
    SalePrice: {
        type: Number
    },
    OriginalPrice: {
        type: Number
    },
    Default: {
        type: String
    },
    Skus: [
        {Size: {
            type: String
        }},
        {Quantity: {
            type: Number
        }}

    ],
    ProductId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }
})

const PhotoSchema = new mongoose.Schema({
    PhotoUrl: {
        type: String
    },
    ThumbnailUrl: {
        type: String
    },
    StylesId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Styles'
    }
})

const RatingSchema = new mongoose.Schema({
    StarRating: {
        type: Number
    },
    ProductId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }
}) 

const ProductSchema = new mongoose.Schema({
    productName: {
        type: String
    },
    defaultPrice: {
        type: Number
    },
    Description: {
        type: String
    },
    Slogan: {
        type: String
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    

});

 
const Category = mongoose.model('Category', CategorySchema);
const Styles = mongoose.model('Styles', StylesSchema);
const Photo = mongoose.model('Photo', PhotoSchema);
const Rating = mongoose.model('Rating', RatingSchema);
const Product = mongoose.model('Product', ProductSchema);