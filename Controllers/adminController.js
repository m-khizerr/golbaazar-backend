const Admin = require('../Models/Admin');
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

const signIn = async (req, res) => {
    try {
        const userName = req.body.userName;
        const password = req.body.password;
        const admin = await Admin.findOne({userName: userName});
        console.log(admin);
        if (!admin) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const role = "admin";
        const isPasswordValid = await bcrypt.compare(password, vendor.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ user: { name: admin.userName } }, process.env.secret_key, {
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

module.exports = {signUp, signIn}