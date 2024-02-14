const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
  cloud_name: 'depro5nnq',
  api_key: '588655131134238',
  api_secret: 'HaArKxwz_IGPVB6KEhui-EjvTXQ',
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'gol-bazaar',
        format: async (req, file) => 'png', // You can set the desired format
        public_id: (req, file) => Date.now() + '-' + file.originalname,
    },
});

const upload = multer({ storage: storage });

const uploadMultiple = multer({
  storage: storage,
}).fields([
  { name: 'coverImage', maxCount: 1 },
  { name: 'cnicFront', maxCount: 1 },
  { name: 'cnicBack', maxCount: 1 }
]);

module.exports = {upload, uploadMultiple};
