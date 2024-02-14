const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    state: {
        type: String,
        require: true,
    },
    coverImage: {
        type: String,
    }
});

const Category = mongoose.model('Categories', categorySchema);
module.exports = Category;