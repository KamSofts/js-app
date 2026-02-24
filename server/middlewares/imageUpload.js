const multer = require('multer');
const path = require('path');

const imgPath = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}${extention(file)}`);
    }
});

function extention(file) {
    return path.extname(file.originalname).toLowerCase();
}

const imgUpload = multer({
    storage: imgPath,
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png/;
        const extname = filetypes.test(extention(file));
        const mimetype = filetypes.test(file.mimetype);
        if (extname && mimetype) {
            return cb(null, true);
        }
        cb(new Error("Unable to upload image."));
    },
    limits: {
        fileSize: 2 * 1024 * 1024
    }
});

module.exports = imgUpload;