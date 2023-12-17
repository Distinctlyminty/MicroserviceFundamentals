const mongoose = require('mongoose');

const uri = 'mongodb://mongo:27017/vehicles';
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000, // Set the timeout for selecting a server
  socketTimeoutMS: 45000, 
  autoIndex: true,
};

async function connect() {
  try {
    await mongoose.connect(uri, options);
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error(err);
  }
}

async function disconnect() {
  try {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (err) {
    console.error(err);
  }
}

module.exports = { connect, disconnect };