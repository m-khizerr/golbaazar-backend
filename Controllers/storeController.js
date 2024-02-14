const Store = require('../Models/Store');
const Vendor = require('../Models/Vendor');
const Product = require('../Models/Product');
const Category = require('../Models/Category');
const { default: mongoose } = require('mongoose');

const addStore = async (req, res) => {
    console.log("adding store");
    try {
        const { name, mainCategory, address, owner } = req.body;
        if (!owner) {
            res.status(500).json({ message: "Owner is required" });
            return;
        }
        const vendor = await Vendor.findById(owner);
        const store = new Store({
            storeName: name,
            mainCategory: mainCategory,
            address: address,
            owner: owner,
        });
        const savedStore = await store.save();
        if (!vendor) {
            res.status(404).json({ message: "Vendor not found" });
            return;
        }
        vendor.store = savedStore._id;
        vendor.mainCategory = mainCategory;
        const updatedVendor = await Vendor.findByIdAndUpdate(vendor._id, vendor);

        res.status(200).json(savedStore);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getStore = async (req, res) => {
    try {
        const ownerId = req.query.ownerId;
        const store = await Store.findOne({owner: ownerId});
        if (!store) {
            return res.status(404).json({ error: 'Store not found' });
        }
        res.status(200).json(store);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
  };

  const getAllStores = async (req, res) => {
    try {
        const stores = await Store.find();
        if (!stores) {
            return res.status(404).json({ error: 'Stores not found' });
        }
        res.status(200).json(stores);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
  };

  const deleteProduct = async (req, res) => {
    try {
      const storeId = req.query.storeId;
      const productId = req.query.productId;
  
      const store = await Store.findById(storeId);
      if (!store) {
        return res.status(404).json({ error: 'Store not found' });
      }
      store.products.pull(productId);
      await Product.findByIdAndDelete(productId);
      await store.save();
      res.status(200).json({ message: 'Product removed from store successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  const deleteCategory = async (req, res) => {
    try {
      const storeId = req.query.storeId;
      const categoryId = req.query.categoryId;
  
      const store = await Store.findById(storeId);
      if (!store) {
        return res.status(404).json({ error: 'Store not found' });
      }
      store.subCategories.pull(categoryId);
      await Category.findByIdAndDelete(categoryId);
      await store.save();
      res.status(200).json({ message: 'Product removed from store successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  

module.exports = {addStore, getStore, getAllStores, deleteCategory, deleteProduct}