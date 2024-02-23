const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    description : {
        type: String,
        require: true,
    },
    coverImage: {
        type: String
    },
    state: {
        type: String,
        require: true,
    },
    date: {
        type: Date,
        default: Date.now(),
    },
    discount: {
        type: Number,
        require: true
    },
    endDate: {
        type: Date
    }
});

const Post = mongoose.model('Posts', postSchema);
module.exports = Post;