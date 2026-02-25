const multer = require('multer');

// Configure storage for uploaded files
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Save files to the 'uploads' directory  
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); //Save file with unique name
    },
});

//File filter to allow only images
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true); //Accept file
    } else {
        cb(new Error('Only JPEG, PNG, and GIF are allowed.'), false); //Reject file
    }
    } 
    
    const upload = multer({ storage, fileFilter });
    module.exports = upload; 