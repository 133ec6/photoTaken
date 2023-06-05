
const express = require('express');
const app = express();
const mongoose = require('mongoose');

// MongoDB connection string
const uri = 'mongodb://127.0.0.1:27017/imageDb';
// Connect to MongoDB
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Define a schema for the image data
const imageSchema = new mongoose.Schema({
  data: String
});

// Create a model based on the schema
const Image = mongoose.model('Image', imageSchema);

// Serve the index.html file
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Handle the image data upload
app.post('/upload', express.json(), (req, res) => {
  const imageData = req.body.data;

  // Create a new image document
  const image = new Image({ data: imageData });

  // Save the image to the database
  image.save();
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
