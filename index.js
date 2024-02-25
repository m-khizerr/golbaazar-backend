const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express()
const multer = require("multer");
const cors = require("cors");
const path = require("path");
app.use("/assets", express.static(path.join(__dirname, "public/assets")));
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(bodyParser.json())


const dotenv = require("dotenv");

dotenv.config();

app.get('/home', (req, res) => {
    res.status(200).json('Welcome, your app is working well');
});

// const authRoutes = require('./routes/authRoutes');
// app.use('/auth', authRoutes);
const vendorRoutes = require('./Routes/Vendor');
app.use('/vendor', vendorRoutes);
const adminRoutes = require('./Routes/Admin');
app.use('/admin', adminRoutes);
const customerRoutes = require('./Routes/Customer');
app.use('/customer', customerRoutes);
const authRoutes = require('./middlewares/authMiddleware');
app.use('/auth', authRoutes);
const productRoutes = require('./Routes/Product');
app.use('/products', productRoutes);
const categoryRoutes = require('./Routes/Category');
app.use('/category', categoryRoutes);
const storeRoutes = require('./Routes/Store');
app.use('/store', storeRoutes);
const postRoutes = require('./Routes/Post');
app.use('/post', postRoutes);
const orderRoutes = require('./Routes/Order');
app.use('/order', orderRoutes);
const offerRoutes = require('./Routes/Offer');
app.use('/offer', offerRoutes);
const voucherRoutes = require('./Routes/Voucher');
app.use('/voucher', voucherRoutes);
const riderRoutes = require('./Routes/Rider');
app.use('/rider', riderRoutes);

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`App Listening at Port ${port}`)
})

const DB = "mongodb+srv://Khizer:khizer1120@geez-database.rlvazjq.mongodb.net/retryWrites=true&w=majority"

mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Database connected successfully!");
}).catch((error) => {
    console.error("Error connecting to the database:", error.message);
});









