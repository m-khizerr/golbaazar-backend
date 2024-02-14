const express = require('express');
const router = express.Router();
const {upload, uploadMultiple} = require("../middlewares/multerMiddleware");
const { addPost, deletePost, editPost, getAllPosts, getAllStories, getPosts } = require('../Controllers/postController');

router.post('/addpost', upload.single('coverImage'), addPost);
router.delete('/deletepost/:postId', deletePost);
router.post('/editpost/:postId',upload.single('coverImage'), editPost);
router.get('/getallposts', getAllPosts);
router.get('/getallstories', getAllStories);
router.get('/getposts', getPosts);

module.exports = router;