const mongoose = require('mongoose');
const { mongoAuth } = require('./mongo_auth');
const mongoUri = "";
//const mongoUri = 'mongodb://localhost/uwclasswatch';
mongoose.connect(mongoUri, { useNewUrlParser: true });
// mongoose.set('debug', true);
const db = mongoose.connection;

const MappingSchema = mongoose.Schema(
  {
    hash: String,
    image: String,
  },
  { collection: 'mapping' },
);


db.once('open', () => {
  console.log('Open!');
});



module.exports.Mappings = mongoose.model('Mappings', MappingSchema);
