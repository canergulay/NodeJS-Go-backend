const uploadImageApi = require('./api/image_upload_api')
const multer = require('multer');
const path = require('path');
const randomNumberGenerator = require('../../utils/random_number_generator')

const imageStorage = multer.diskStorage({
    // Destination to store image     
    destination: 'assets', 
      filename: (req, file, cb) => {
          let fileName =  file.fieldname + '_' + Date.now() + '_' +randomNumberGenerator() +'_'+ randomNumberGenerator() + path.extname(file.originalname)
          req.imagePath = fileName
          cb(null, fileName)
            // file.fieldname is name of the field (image)
            // path.extname get the uploaded file extension
    }
});

const imageUpload = multer({
    storage: imageStorage,
    limits: {
      fileSize: 1000000 // 1000000 Bytes = 1 MB
    },
    fileFilter(req, file, cb) {
      if (!file.originalname.match(/\.(png|jpg)$/)) { 
         // upload only png and jpg format
         return cb(new Error('Please upload a Image'))
       }
     cb(undefined, true)
  }
}) 

const express = require('express')
const router = express.Router()

const uploadImagePath = '/upload/image'

router.post(uploadImagePath,imageUpload.single('image'),uploadImageApi.imageUpload)

module.exports = router

