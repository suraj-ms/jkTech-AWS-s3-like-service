const fs = require('fs');

const mainDirectory = './buckets';

function createBucket(req, res) {
  const bucketName = req.params.bucketName;
  const bucketPath = `${mainDirectory}/${bucketName}`;
  fs.mkdir(bucketPath, (err) => {
    if (err) {
      res.status(500).send(err.message);
      return;
    }
    res.send(`Bucket ${bucketName} created successfully.`);
  });
}

function listBuckets(req, res) {
  fs.readdir(mainDirectory, (err, files) => {
    if (err) {
      res.status(500).send(err.message);
      return;
    }
    const buckets = files.filter(file => {
      const fullPath = `${mainDirectory}/${file}`;
      return fs.statSync(fullPath).isDirectory() && file !== 'uploads';
    });
    res.send(buckets);
  });
}

function putObject(req, res) {
  const bucketName = req.params.bucketName;
  const file = req.file;
  if (!file) {
    res.status(400).send('No file uploaded.');
    return;
  }
  fs.rename(file.path, `${mainDirectory}/${bucketName}/${file.originalname}`, (err) => {
    if (err) {
      res.status(500).send(err.message);
      return;
    }
    res.send(`File ${file.originalname} uploaded to ${bucketName} successfully.`);
  });
}

function getObject(req, res) {
  const bucketName = req.params.bucketName;
  const fileName = req.params.fileName;
  const filePath = `${mainDirectory}/${bucketName}/${fileName}`;
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.status(500).send(err.message);
      return;
    }
    res.end(data);
  });
}

function deleteObject(req, res) {
  const bucketName = req.params.bucketName;
  const fileName = req.params.fileName;
  const filePath = `${mainDirectory}/${bucketName}/${fileName}`;
  fs.unlink(filePath, (err) => {
    if (err) {
      res.status(500).send(err.message);
      return;
    }
    res.send(`File ${fileName} deleted from ${bucketName} successfully.`);
  });
}

function listObjects(req, res) {
  const bucketName = req.params.bucketName;
  fs.readdir(`${mainDirectory}/${bucketName}`, (err, files) => {
    if (err) {
      res.status(500).send(err.message);
      return;
    }
    res.send(files);
  });
}


module.exports = { createBucket, listBuckets , putObject, getObject, deleteObject, listObjects};
