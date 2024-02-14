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

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`App Listening at Port ${port}`)
})

app.use("/", (req,res) => {
    res.json({message: "Hello World"})
})

// const authRoutes = require('./routes/authRoutes');
// app.use('/auth', authRoutes);
const vendorRoutes = require('./Routes/Vendor');
app.use('/vendor', vendorRoutes);
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

const DB = "mongodb+srv://khizer:khizer1120@db.5j8g0xd.mongodb.net/retryWrites=true&w=majority"

mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("Database connected"))
    .catch((error) => console.log(error.message));








