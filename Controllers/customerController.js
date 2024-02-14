const Customer = require('../Models/Customer');
const Blocked = require('../Models/Blocked')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { default: mongoose } = require('mongoose');

const register = async (req, res) => {
  try {
      console.log("signing Up!!!");

      const {name, phone, cnic, password} = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const customer = new Customer({
          name: name,
          phone: phone,
          cnic, cnic,
          password: hashedPassword,
      });
      const savedCustomer = await customer.save();
      res.status(200).json(savedCustomer);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

const signIn = async (req, res) => {
    try {
        const {phone, password} = req.body.formData;
        const customer = await Customer.findOne({phone: phone});
        console.log(customer);
        if (!customer) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const isPasswordValid = await bcrypt.compare(password, admin.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ user: { id: customer._id, name: customer.name } }, process.env.secret_key, {
            expiresIn: '1h',
          });
        res.status(200).json({ 
          token,
          customer,
         });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAllCustomers = async (req, res) => {
    try {
      const customers = await Customer.find(); 
  
      res.status(200).json({
        message: "Customers retrieved successfully",
        customers: customers,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  const blockUser = async (req, res) => {
    try {
        const { id } = req.params;
        const customer = await Customer.findById(id);

        if( customer.status === "active") {
            const block = new Blocked({
              phone: customer.phone,
              cnic: customer.cnic,
            })
            await block.save();
            customer.status = "block" }
        else if( customer.status === "block") {
            const cnic = customer.cnic;
            const deletedVendor = await Blocked.findOneAndDelete({ cnic: cnic });
            customer.status = "active" }
        
        const blockedCustomer = await Customer.findByIdAndUpdate(id, customer);
        
        res.status(200).json(blockedCustomer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteCustomer = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedCustomer = await Customer.findByIdAndRemove(id);
        res.status(200).json(deletedCustomer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getCustomer = async (req, res) => {
    try {
      const customerId = req.params.id;
      const customer = await Customer.findById(customerId);
      if (!customer) {
        return res.status(404).json({ error: 'Customer not found' });
      }
      res.status(200).json(customer);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

module.exports = {signIn, getAllCustomers, register, blockUser, deleteCustomer, getCustomer};