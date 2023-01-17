import express from "express";

const router = express.Router();

import multer from "multer";

//multer to store images in public/images folder
//of server accessable by clients and file will be stored by name.

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images');
    }
    , filename: (req, file, cb) => {
        cb(null, req.body.name);
    }
});
const upload = multer({ storage: storage });

//this route will be used to upload images and called from the index file

router.post('/', upload.single('file'), (req, res) => {
    try {
        return res.status(200).json('File uploaded successfully');
    } catch (error) {
        console.log(error);
    }
});

export default router;