const mongoose = require('mongoose');
const Order  = require('../Models/Order');
const Rider = require('../Models/Rider');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const addOrder = async (req, res) => {
    try {
      const order = req.body;
  
      const riderId = req.params.riderId;
      const rider = await Rider.findById(riderId);
      console.log(rider);

      if (!rider) {
        return res.status(404).json({ error: 'Rider not found' });
      }

      rider.orders.push(order);
  
      await rider.save();
      res.json({message: "order assigned successfully!"})
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  const getAllOrders = async (req, res) => {
    try {
      const orders = await Order.find(); 
      const filteredOrders = orders.filter((order) => { return order.status == "Pending"    });
      res.status(200).json({
        message: "Orders retrieved successfully",
        orders: filteredOrders,
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

  const register = async (req, res) => {
    try {
        const {name, phone, cnic, password} = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const rider = new Rider({
            name: name,
            phone: phone,
            cnic, cnic,
            password: hashedPassword,
        });
        const savedrider = await rider.save();
        res.status(200).json(savedrider);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
  };

  const signIn = async (req, res) => {
    try {
        const {phone, password} = req.body.formData;
        const rider = await Rider.findOne({phone: phone});
        if (!rider) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const isPasswordValid = await bcrypt.compare(password, admin.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ user: { id: rider._id, name: rider.name } }, process.env.secret_key, {
            expiresIn: '1h',
          });
        res.status(200).json({ 
          token,
          rider,
         });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

  
const getAllRiders = async (req, res) => {
    try {
      const riders = await Rider.find(); 
      res.status(200).json({
        message: "Riders retrieved successfully",
        riders: riders,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

module.exports = {addOrder, getAllOrders, editOrder, register, signIn, getAllRiders};