const express = require('express');
const bodyParser = require('body-parser');
const s3 = require('s3');
const cors = require('cors');
const busboy = require('connect-busboy');
const { s3Auth } = require('./s3_auth');
const { Mappings } = require('./db.js');

const app = express();
const port = 3001;
const s3Client = s3.createClient({
  maxAsyncS3: 20,
  s3RetryCount: 3,
  s3RetryDelay: 1000,
  multipartUploadThreshold: 20971520,
  multipartUploadSize: 15728640,
  s3Options: {
    accessKeyId: s3Auth.id,
    secretAccessKey: s3Auth.key,
  },
});

app.use(bodyParser.json());
app.use(cors());
app.use(busboy());

app.post('/imageToMongo', (req, res) => {
  // Receives Base-64 image, sends to Mongo
//   console.log(req.body)
  const { hash, image } = req.body;
  Mappings.create({
    hash,
    image,
  }, (err) => {
    if (err) {
      console.log(err);
    }
  });
  res.sendStatus(200);
});

app.post('/videoToS3', (req, res) => {
  console.log(req.body);
  res.sendStatus(200);
});

app.listen(port);
