// Importing
const mongoose = require('mongoose');
const url = "mongodb+srv://volong2004:khung658@mymongodb.whgnern.mongodb.net/blog_dev?retryWrites=true&w=majority&appName=mymongodb";
mongoose.set('strictQuery', false);


// Connecting to MongoDB
async function connect() {
  try {
    await mongoose.connect(url, {
    });
    console.log('Connect Successfully');
  } catch (error) {
    console.log('Connect failure');
  }
}

module.exports = { connect };


// passwor: RsdQLl8liHzT705B

