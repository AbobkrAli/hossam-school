// multerConfig.js

import multer from 'multer';
import path from 'path';

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Specify the destination directory for uploaded files
    cb(null, path.join('uploads', '..', 'uploads')); // Destination: './uploads' directory
  },
  filename: function (req, file, cb) {
    // Specify the file name for uploaded files
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const fileExtension = path.extname(file.originalname); // Get file extension
    cb(null, file.fieldname + '-' + uniqueSuffix + fileExtension); // Example: 'image-1234567890.jpg'
  }
});

// Multer upload configuration
const upload = multer({ storage: storage });

export default upload;
