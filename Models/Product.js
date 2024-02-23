const mongoose = require ("mongoose")

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    price: {
        type: Number,
        require: true,
    },
    subCategory: {
        type: String, 
        require: true,
    },
    quantity: {
        type: Number,
        require: true,
    },
    coverImage: {
        type: String,
        require: true,
    }
})

const Product = mongoose.model('Products', productSchema);
module.exports = Product;