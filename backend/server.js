const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const shortid = require('shortid');
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

app.post('/upload', (req, res) => {
    const hash = shortid.generate();
    const { image, video } = req.files;
    
    // upload image
    Mappings.create({
        hash,
        image: image.data.toString('base64'),
    }, (err) => {
        if (err) console.log(err);
    });

    // upload video
    const params = {
        Key: hash,
        Bucket: s3Auth.inBucket,
        Body: video.data,
        Encoding: video.encoding
    }
    // s3.upload(params, (err) => {
    //     if (err) console.log(err);
    // });
  
    res.sendStatus(200);
});

app.listen(port);
