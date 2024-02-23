const mongoose = require('mongoose');
const Product = require('../Models/Product');
const Store = require('../Models/Store');
const cloudinary = require('cloudinary').v2;

const addProduct = async (req, res) => {
    try {
      const { name, price, quantity, subCategory, owner} = req.body;
      if (!name || !price || !quantity || !subCategory) {
        return res.status(400).json({ error: 'All fields are required' });
      }
  
      const result = await cloudinary.uploader.upload(req.file.path);
      const product = new Product({
        name,
        price,
        quantity,
        subCategory,
        coverImage: result.secure_url
      });

      const store = await Store.findOne({owner: owner});
      if (!store) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      store.products.push(product);
      Promise.all([store.save(), product.save()])
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
        const vendorId = req.params.vendorId;
        console.log(vendorId);
        const store = await Store.findOne({ owner: vendorId });
        if (!store) {
          return res.status(404).json({ error: 'Store not found' });
        }
        const allProducts = await Product.find();
        const products = store.products;
        const filteredProducts = allProducts.filter(product => {
          return products.some(prdct => prdct._id.equals(product._id)); 
        });
        res.status(200).json({
            message: "Products retrieved successfully",
            products: filteredProducts,
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
    const deletedProduct = await Product.findByIdAndDelete(productId);
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
  