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

aws.config.update({ region: 'us-east-1', accessKeyId: s3Auth.id, secretAccessKey: s3Auth.key });
aws.config.mediaconvert = { endpoint: s3Auth.mediaConvertEndpoint };

const jsonJob = require('./job.json');

const s3 = new aws.S3({
    accessKeyId: s3Auth.id,
    secretAccessKey: s3Auth.key,
});

app.use(bodyParser.json());
app.use(cors());
app.use(fileUpload());

app.get('/getHashPairs', (req, res) => {
  Mappings.find({}, (err, found) => {
    let map = {};

    found.forEach((elem) => {
      map[elem.hash] = elem.image;
    });

    res.send(userMap);
  })
});

app.post('/upload', (req, res) => {
    const hash = shortid.generate();
    const { image, video } = req.files;
    
    console.log(hash);

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

    s3.upload(params, (err) => {
        if (err) {
            console.log(err);
        }
        jsonJob.Settings.Inputs[0].FileInput = "s3://" + s3Auth.inBucket + "/" + hash;
        jsonJob.Settings.OutputGroups[0].OutputGroupSettings.DashIsoGroupSettings.Destination = "s3://" + s3Auth.outBucket + "/";
        const mc = new aws.MediaConvert();
        mc.createJob(jsonJob, (err) => {
            if (err) {
                console.log(err);
            }
        });
    });
    res.sendStatus(200);
});

app.listen(port);
