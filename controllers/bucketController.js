// Importing the file system module
const fs = require('fs');

// Main directory where buckets are stored
const mainDirectory = './buckets';

// Function to create a new bucket
function createBucket(req, res) {
  const bucketName = req.params.bucketName;
  const bucketPath = `${mainDirectory}/${bucketName}`;

  // Creating the bucket directory
  fs.mkdir(bucketPath, (err) => {
    if (err) {
      res.status(500).send(err.message);
      return;
    }
    res.send(`Bucket ${bucketName} created successfully.`);
  });
}

// Function to list all buckets
function listBuckets(req, res) {

  // Reading the main directory to get a list of files (buckets)
  fs.readdir(mainDirectory, (err, files) => {
    if (err) {
      res.status(500).send(err.message);
      return;
    }

    // Filtering out non-directory files (buckets) and excluding 'uploads' directory
    const buckets = files.filter(file => fs.statSync(`${mainDirectory}/${file}`).isDirectory() && file !== 'uploads');
    res.send(buckets);
  });
}

// Function to upload an object to a bucket
function putObject(req, res) {
  const bucketName = req.params.bucketName;
  const file = req.file;

  // If no file is uploaded
  if (!file) {
    res.status(400).send('No file uploaded.');
    return;
  }

  // Moving the uploaded file to the specified bucket directory
  fs.rename(file.path, `${mainDirectory}/${bucketName}/${file.originalname}`, (err) => {
    if (err) {
      res.status(500).send(err.message);
      return;
    }
    res.send(`File ${file.originalname} uploaded to ${bucketName} successfully.`);
  });
}

// Function to retrieve an object from a bucket
function getObject(req, res) {
  const bucketName = req.params.bucketName;
  const fileName = req.params.fileName;
  const filePath = `${mainDirectory}/${bucketName}/${fileName}`;

  // Reading the file
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.status(500).send(err.message);
      return;
    }
    res.end(data);
  });
}

// Function to delete an object from a bucket
function deleteObject(req, res) {
  const bucketName = req.params.bucketName;
  const fileName = req.params.fileName;
  const filePath = `${mainDirectory}/${bucketName}/${fileName}`;

  // Deleting the file
  fs.unlink(filePath, (err) => {
    if (err) {
      res.status(500).send(err.message);
      return;
    }
    res.send(`File ${fileName} deleted from ${bucketName} successfully.`);
  });
}

// Function to list objects in a bucket
function listObjects(req, res) {
  const bucketName = req.params.bucketName;

  // Reading the bucket directory
  fs.readdir(`${mainDirectory}/${bucketName}`, (err, files) => {
    if (err) {
      res.status(500).send(err.message);
      return;
    }
    res.send(files);
  });
}

// Exporting all functions as a module
module.exports = { createBucket, listBuckets, putObject, getObject, deleteObject, listObjects };
