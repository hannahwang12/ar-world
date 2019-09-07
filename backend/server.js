const express = require('express');
const bodyParser = require('body-parser');
const { MappingSchema } = require('./db.js/index.js.js');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/imageToMongo', (req, res) => {
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
