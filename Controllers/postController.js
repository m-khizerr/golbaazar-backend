const mongoose = require('mongoose');
const Post = require('../Models/Post');
const User = require('../Models/Vendor');
const cloudinary = require('cloudinary').v2;

const addPost = async (req, res) => {
    try {
      const { description, type, coverImage, state } = req.body;

      console.log(description);

      if (!description || !type) {
        return res.status(400).json({ error: 'All fields are required' });
      }

      const result = await cloudinary.uploader.upload(req.file.path);
  
      const post = new Post({
        description: description,
        type: type,
        state: state,
        coverImage: result.secure_url,
      });

      if (state === 'public') {
        await post.save();

        return res.status(201).json({
            message: 'Post Created Successfully',
            post: post,
        });
      }
  
      // const userId = req.user._id;
      // const user = await User.findById({userId});

      const phone = req.body.phone;
      const user = await User.findOne({phone});
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      user.posts.push(post);
  
      Promise.all([user.save(), post.save()])
        .then(() => {
            res.status(201).json({
            message: 'Post Created Successfully',
            createdPost: post,
            });
        })
        .catch((saveError) => {
            console.error('Error saving user or category:', saveError);
            res.status(500).json({ error: 'Internal server error' });
        });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  const deletePost = async (req, res) => {
    const postId = req.params.postId;
  
    try {
      const deletedPost = await Post.findByIdAndRemove(postId);
      if (!deletedPost) {
        return res.status(404).json({ message: 'Post not found' });
      }
  
      res.status(200).json({
        message: 'Post deleted successfully',
        deletedPost,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  const editPost = async (req, res) => {
    try {
      const postId = req.params.postId;
      const result = await cloudinary.uploader.upload(req.file.path);
      let up = req.body;
      up.coverImage = result.secure_url;
      const updatedpost = await Post.findByIdAndUpdate(postId,up, { new: true });
      if (!updatedpost) {
        return res.status(404).json({ message: 'Post not found' });
      }
      res.status(200).json({
        message: 'Post updated successfully',
        post: updatedpost,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  const getAllPosts = async (req, res) => {
    try {
      const posts = await Post.find(); 
  
      const filteredPosts = posts.filter(post => post.type === 'post');

      res.status(200).json({
        message: "Posts retrieved successfully",
        posts: filteredPosts,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  const getAllStories = async (req, res) => {
    try {
      const posts = await Post.find(); 
  
      const filteredStories = posts.filter(post => post.type === 'story');

      res.status(200).json({
        message: "Stories retrieved successfully",
        posts: filteredStories,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  const getPosts = async (req, res) => {
    try {

        // const userId = req.user._id;
        // const user = await User.findOne({ phone });
        // const products = user.products;

        const { phone } = req.body;
        const user = await User.findOne({ phone });
        console.log(user);
        const posts = user.posts;
        res.status(200).json({
            message: "Categories retrieved successfully",
            posts: posts,
        });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };



  module.exports = { addPost, deletePost, editPost, getAllPosts, getAllStories, getPosts };