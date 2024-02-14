const mongoose = require ("mongoose")

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
        require: true,
    },
    category: {
        type: String, 
        require: true,
    },
    quantity: {
        type: Number,
        require: true,
    },

})

const Product = mongoose.model('Products', productSchema);
module.exports = Product;