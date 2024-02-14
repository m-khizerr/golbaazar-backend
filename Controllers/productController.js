const mongoose = require('mongoose');
const Product = require('../Models/Product');
const User = require('../Models/Vendor');

const addProduct = async (req, res) => {
    try {
      const { name, price, quantity, category, description} = req.body;

      if (!name || !price || !quantity || !description) {
        return res.status(400).json({ error: 'All fields are required' });
      }
  
      const product = new Product({
        name,
        description,
        price,
        quantity,
        category,
      });
  
      // const userId = req.user._id;
      // const user = await User.findById({userId});

      const phone = req.body.phone;
      const user = await User.findOne({phone});
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      user.products.push(product);
  
      Promise.all([user.save(), product.save()])
        .then(() => {
            res.status(201).json({
            message: 'Product Created Successfully',
            createdProduct: product,
            });
        })
        .catch((saveError) => {
            console.error('Error saving user or product:', saveError);
            res.status(500).json({ error: 'Internal server error' });
        });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  


  const getAllProducts = async (req, res) => {
    try {
      const products = await Product.find(); 
  
      res.status(200).json({
        message: "Products retrieved successfully",
        products: products,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  const getProducts = async (req, res) => {
    try {

        // const userId = req.user._id;
        // const user = await User.findOne({ phone });
        // const products = user.products;

        const { phone } = req.body;
        const user = await User.findOne({ phone });
        console.log(user);
        const products = user.products;
        res.status(200).json({
            message: "Products retrieved successfully",
            products: products,
        });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };


  const editProduct = async (req, res) => {
    try {
      let up = req.body;
      const product = await Product.findByIdAndUpdate(up._id,up, { new: true });
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }

      res.status(200).json({
        message: 'Product updated successfully',
        updatedProduct: product,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

const deleteProduct = async (req, res) => {
  const productId = req.params.productId;

  try {
    const deletedProduct = await Product.findByIdAndRemove(productId);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({
      message: 'Product deleted successfully',
      deletedProduct,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


  module.exports = { addProduct, getAllProducts, editProduct, deleteProduct, getProducts };
  