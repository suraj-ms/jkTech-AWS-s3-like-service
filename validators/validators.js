// Middleware function to validate bucket name
function validateBucketName(req, res, next) {
  const bucketName = req.params.bucketName;
  if (!bucketName || typeof bucketName !== 'string' || bucketName.trim() === '') {
    return res.status(400).send('Bucket name is required and must be a non-empty string.');
  }
  next();
}

// Middleware function to validate file name
function validateFileName(req, res, next) {
  const fileName = req.params.fileName;
  if (!fileName || typeof fileName !== 'string' || fileName.trim() === '') {
    return res.status(400).send('File name is required and must be a non-empty string.');
  }
  next();
}

// Middleware function to validate file upload
function validateFileUpload(req, res, next) {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  next();
}

module.exports = { validateBucketName, validateFileName, validateFileUpload };
