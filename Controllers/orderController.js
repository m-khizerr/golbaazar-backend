const mongoose = require('mongoose');
const Order = require('../Models/Order');
const Vendor = require('../Models/Vendor');
const Store = require('../Models/Store');
const Customer = require('../Models/Customer');

const addOrder = async (req, res) => {
    try {
      const { orderId, price, deliveryAddress, seller, customer} = req.body;
      const order = new Order({
        orderId: orderId,
        price: price,
        deliveryAddress: deliveryAddress,
        seller: seller, 
        customer: customer,
      })
  
      const sellerId = req.body.seller;
      const sellerStore = await Store.findOne({ owner : sellerId });

      const customerId = req.body.customer;
      const selectedCustomer = await Customer.findById(customerId);

      if (!sellerStore || !selectedCustomer) {
        return res.status(404).json({ error: 'Customer or seller not found' });
      }
      
      const savedOrder = await order.save();

      sellerStore.orders.push(savedOrder);
      selectedCustomer.orders.push(savedOrder);
  
      Promise.all([sellerStore.save(), selectedCustomer.save(),])
        .then(() => {
            res.status(201).json({
            message: 'Order Created Successfully',
            createdOrder: savedOrder,
            });
        })
        .catch((saveError) => {
            console.error('Error saving user or Order:', saveError);
            res.status(500).json({ error: 'Internal server error' });
        });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  const getAllOrders = async (req, res) => {
    try {
      const orders = await Order.find(); 
      res.status(200).json({
        message: "Orders retrieved successfully",
        orders: orders,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  const getOrdersDetails = async (req, res) => {
    try {
      const orders = await Order.find(); 
      res.status(200).json({
        message: "Orders retrieved successfully",
        orders: orders,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  const getOrders = async (req, res) => {
    try {

        // const userId = req.user._id;
        // const user = await User.findOne({ phone });
        // const products = user.products;

        const { phone } = req.body;
        const user = await Vendor.findOne({ phone });
        console.log(user);
        const orders = user.orders;
        res.status(200).json({
            message: "Orders retrieved successfully",
            orders: orders,
        });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  const editOrder = async (req, res) => {
    try {
      let uo = req.body;
      const order = await Order.findByIdAndUpdate(uo._id,uo, { new: true });
      if (!order) {
        return res.status(404).json({ message: 'order not found' });
      }
      res.status(200).json({
        message: 'Order updated successfully',
        updatedOrder: order,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

const deleteOrder = async (req, res) => {
  const orderId = req.params.orderId;

  try {
    const deletedorder = await Order.findByIdAndRemove(orderId);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({
      message: 'Order deleted successfully',
      deletedProduct,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {addOrder, deleteOrder, editOrder, getAllOrders, getOrders}