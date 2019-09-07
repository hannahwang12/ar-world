const express = require('express');
const bodyParser = require('body-parser');
const s3 = require('s3');
const cors = require('cors');
const { s3Auth } = require('./s3_auth');
const fileUpload = require('express-fileupload');
const { Mappings } = require('./db.js');
let aws = require('aws-sdk'); 

const app = express();
const port = 3001;

aws.config.update({
  region: 'us-east-1',
  accessKeyId: s3Auth.id,
  secretAccessKey: s3Auth.key,
})

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
  console.log(req.files.video); // the uploaded file object
});

app.listen(port);
