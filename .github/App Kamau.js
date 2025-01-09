const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/wheelsbykamau', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define a Car Schema
const carSchema = new mongoose.Schema({
  make: String,
  model: String,
  year: Number,
  price: Number,
  isSold: Boolean,
});

const Car = mongoose.model('Car', carSchema);

// API endpoint to get all cars
app.get('/api/cars', async (req, res) => {
  const cars = await Car.find({});
  res.json(cars);
});

// API endpoint to add a new car
app.post('/api/cars', async (req, res) => {
  const car = new Car(req.body);
  await car.save();
  res.json(car);
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

