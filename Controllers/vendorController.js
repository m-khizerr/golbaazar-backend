const Admin = require('../Models/Admin');
const Vendor = require('../Models/Vendor');
const Blocked = require('../Models/Blocked')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { default: mongoose } = require('mongoose');
const cloudinary = require('cloudinary').v2;

const signUp = async (req, res) => {
    try {
        console.log("signing Up!!!");

        const {userName, password} = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const admin = new Admin({
            userName: userName,
            password: hashedPassword,
        });
        const savedAdmin = await admin.save();
        res.status(200).json(savedAdmin);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const register = async (req, res) => {
  try {
    console.log("Signing up");
    const { name, phone, cnic, password } = req.body;
    //const hashedPassword = await bcrypt.hash(password, 10);

    console.log(req.coverImage);

    const coverImage = req.files.coverImage[0];
    const cnicFront = req.files.cnicFront[0];
    const cnicBack = req.files.cnicBack[0];

    // Upload images to Cloudinary (similar to your existing logic)
    const coverImageResult = await cloudinary.uploader.upload(coverImage.path);
    const cnicFrontResult = await cloudinary.uploader.upload(cnicFront.path);
    const cnicBackResult = await cloudinary.uploader.upload(cnicBack.path);

    console.log("Got images");
    const vendor = new Vendor({
      name: name,
      phone: phone,
      cnic: cnic,
      password: password,
      coverImage: coverImageResult.secure_url,
      cnicFront: cnicFrontResult.secure_url,
      cnicBack: cnicBackResult.secure_url
    });

    console.log("Made the user");
    const savedVendor = await vendor.save();
    res.status(200).json(savedVendor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




const signIn = async (req, res) => {
    try {
        const phone = req.body.phone;
        const password = req.body.password;
        const vendor = await Vendor.findOne({phone: phone});
        console.log(vendor);
        if (!vendor) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const role = "vendor";
        // const isPasswordValid = await bcrypt.compare(password, vendor.password);
        // if (!isPasswordValid) {
        //     return res.status(401).json({ message: 'Invalid credentials' });
        // }
        const token = jwt.sign({ user: { id: vendor._id, name: vendor.name } }, process.env.secret_key, {
            expiresIn: '1h',
          });
        res.status(200).json({ 
          token,
          vendor,
          role,
         });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAllVendors = async (req, res) => {
    try {
      const vendors = await Vendor.find(); 
  
      res.status(200).json({
        message: "Vendors retrieved successfully",
        vendors: vendors,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  const getVendor = async (req, res) => {
    try {
      const vendorId = req.params.id; 
      const vendor = await Vendor.findById(vendorId);
      if (!vendor) {
        return res.status(404).json({ error: 'Vendor not found' });
      }
      res.status(200).json(vendor);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
const deleteVendor = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedVendor = await Vendor.findByIdAndRemove(id);
        res.status(200).json(deletedVendor);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const blockUser = async (req, res) => {
    try {
        const { id } = req.params;
        const vendor = await Vendor.findById(id);

        if( vendor.status === "active") {
            const block = new Blocked({
              phone: vendor.phone,
              cnic: vendor.cnic,
            })
            await block.save();
            vendor.status = "block" }
        else if( vendor.status === "block") {
            const cnic = vendor.cnic;
            const deletedVendor = await Blocked.findOneAndDelete({ cnic: cnic });
            vendor.status = "active" }
        
        const blockedVendor = await Vendor.findByIdAndUpdate(id, vendor);
        
        res.status(200).json(blockedVendor);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { signUp, signIn, getAllVendors, deleteVendor, blockUser, getVendor, register};