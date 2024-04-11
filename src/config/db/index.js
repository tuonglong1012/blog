// Importing
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

// Connecting to MongoDB
async function connect() {
  try {
    await mongoose.connect('mongodb://localhost/blog_dev', {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    });
    console.log('Connect Successfully');
  } catch (error) {
    console.log('Connect failure');
  }
}

module.exports = { connect };
