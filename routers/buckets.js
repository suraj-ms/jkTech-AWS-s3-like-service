// Importing required modules
const express = require('express');
const multer = require('multer');
const { createBucket, putObject, getObject, deleteObject, listObjects, listBuckets } = require('../controllers/bucketController');
const { validateBucketName, validateFileName, validateFileUpload } = require('../validators/validators');

// Creating an Express router instance
const router = express.Router();

// Setting up multer for handling file uploads
const upload = multer({ dest: './buckets/' });

router.post('/createBucket/:bucketName', validateBucketName, createBucket);
router.post('/putObject/:bucketName', validateBucketName, upload.single('file'), validateFileUpload, putObject);
router.get('/getObject/:bucketName/:fileName', validateBucketName, validateFileName, getObject);
router.delete('/deleteObject/:bucketName/:fileName', validateBucketName, validateFileName, deleteObject);
router.get('/listObjects/:bucketName', validateBucketName, listObjects);
router.get('/listBuckets', listBuckets);

module.exports = router;
