const mongoose = require('mongoose');
const { mongoAuth } = require('./mongo_auth');
const mongoUri = `mongodb+srv://${mongoAuth.user}:${mongoAuth.password}@cluster0-cacuy.mongodb.net/ARWorld?retryWrites=true&w=majority`;
mongoose.connect(mongoUri, { useNewUrlParser: true });
const db = mongoose.connection;

const MappingSchema = mongoose.Schema(
  {
    hash: String,
    image: String,
  },
  { collection: 'mappings' },
);

db.once('open', () => {
  console.log('Open!');
});

module.exports.Mappings = mongoose.model('Mappings', MappingSchema);
