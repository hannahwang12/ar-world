const express = require('express');
const bodyParser = require('body-parser');
const s3 = require('s3');
const { s3Auth } = require('./s3_auth');
const { MappingSchema } = require('./db.js');

const app = express();
const port = 3000;
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

app.post('/imageToMongo', (req, res) => {
    // Receives Base-64 image, sends to Mongo
    const { hash, image } = req.body;
    const imageVideoPair = new MappingSchema(hash, image);

    MappingSchema.create(imageVideoPair, (err) => {
        if (err) {
            console.log(err);
        }
    });
    res.sendStatus(200);
});

app.listen(port);
