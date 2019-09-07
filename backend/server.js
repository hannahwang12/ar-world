const express = require('express');
const bodyParser = require('body-parser');

const cors = require('cors');
const { s3Auth } = require('./s3_auth');
const fileUpload = require('express-fileupload');
const { Mappings } = require('./db.js');

const aws = require('aws-sdk');
const app = express();
const port = 3001;

const s3 = new aws.S3({
    accessKeyId: s3Auth.id,
    secretAccessKey: s3Auth.key,
});

app.use(bodyParser.json());
app.use(cors());
app.use(fileUpload());

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

app.post('/videoToS3', function(req, res) {
    const params = {
        Key: req.files.video.name,
        Bucket: s3Auth.inBucket,
        Body: req.files.video.data,
        Encoding: req.files.video.encoding
    }

    s3.upload(params, (err) => {
        console.log(err);
    });
    res.sendStatus(200);
});

app.listen(port);
