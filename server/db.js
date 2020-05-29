const mongoose = require('mongoose');

const { MONGO_USER, MONGO_PASS, MONGO_HOST, MONGO_DB} = process.env;

const URI = `mongodb://${MONGO_USER}:${MONGO_PASS}@${MONGO_HOST}/${MONGO_DB}`;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  authSource: 'admin'
};

module.exports.db = mongoose.createConnection(URI, options, (err) => {
  if (err) {
    console.error(`Failed to connect to database: ${err}`);
  } else {
    console.log(`Successfully connected to database '${MONGO_DB}'`);
  }
});
