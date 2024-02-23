const mongoose = require('mongoose');
const Category = require('../Models/Category');
const User = require('../Models/Vendor');
const Store = require('../Models/Store');
const cloudinary = require('cloudinary').v2;

const addCategory = async (req, res) => {
    try {
      const { name, state } = req.body;
      if (!name || !state) {
        return res.status(400).json({ error: 'All fields are required' });
      }
      const result = await cloudinary.uploader.upload(req.file.path);
      const category = new Category({
        name: name,
        state: state,
        coverImage: result.secure_url, // Store the image URL in the database
      });

      if (state === 'public') {
        await category.save();
        return res.status(201).json({
            message: 'Category Created Successfully',
            createdCategory: category,
        });
      }

      const owner = req.body.owner;
      const store = await Store.findOne({owner: owner});
  
      if (!store) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      store.subCategories.push(category);
  
      Promise.all([store.save(), category.save()])
        .then(() => {
            res.status(201).json({
            message: 'Category Created Successfully',
            createdCategory: category,
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

  const deleteCategory = async (req, res) => {
    const categoryId = req.params.categoryId;
  
    try {
      const deletedCategory = await Category.findByIdAndRemove(categoryId);
      if (!deletedCategory) {
        return res.status(404).json({ message: 'Category not found' });
      }
  
      res.status(200).json({
        message: 'Category deleted successfully',
        deletedCategory,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  const editCategory = async (req, res) => {
    try {
      const categoryId = req.params.categoryId;
      console.log(req.params);
      console.log(req.param.categoryId)
      console.log(categoryId);
      const result = await cloudinary.uploader.upload(req.file.path);
      let uc = req.body;
      uc.coverImage = result.secure_url;
      const updatedCategory = await Category.findByIdAndUpdate(categoryId,uc, { new: true });
      if (!updatedCategory) {
        return res.status(404).json({ message: 'Category not found' });
      }
      res.status(200).json({
        message: 'Category updated successfully',
        category: updatedCategory,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  const getAllCategories = async (req, res) => {
    try {
      console.log("sending request...");
      const categories = await Category.find();
      const adminCategories = categories.filter((category) => { return category.state === "public"} );
      res.status(200).json({
        message: "Categories retrieved successfully",
        categories: adminCategories,
      });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };


  const getCategory = async (req, res) => {
    try {
        const vendorId = req.params.vendorId;
        const store = await Store.findOne({ owner: vendorId });
        const allCategories = await Category.find();
        const categories = store.subCategories;
        const filteredCategories = allCategories.filter(category => {
          return categories.some(cat => cat._id.equals(category._id)); 
        });
        res.status(200).json({
            message: "Categories retrieved successfully",
            categories: filteredCategories,
        });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };



  module.exports = { addCategory, deleteCategory, editCategory, getAllCategories, getCategory };