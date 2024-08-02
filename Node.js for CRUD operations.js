const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/cars', { useNewUrlParser: true, useUnifiedTopology: true });

const Car = mongoose.model('Car', {
  name: String,
  manufacturingYear: Number,
  price: Number
});

app.post('/admin/cars', (req, res) => {
  const { name, manufacturingYear, price } = req.body;
  const car = new Car({ name, manufacturingYear, price });
  car.save((err) => {
    if (err) {
      res.status(500).send('Error creating car');
    } else {
      res.send('Car created successfully');
    }
  });
});

app.get('/admin/cars', (req, res) => {
  Car.find().then((cars) => {
    res.send(cars);
  }).catch((err) => {
    res.status(500).send('Error retrieving cars');
  });
});

app.put('/admin/cars/:id', (req, res) => {
  const { id } = req.params;
  const { name, manufacturingYear, price } = req.body;
  Car.findByIdAndUpdate(id, { name, manufacturingYear, price }, (err) => {
    if (err) {
      res.status(500).send('Error updating car');
    } else {
      res.send('Car updated successfully');
    }
  });
});

app.delete('/admin/cars/:id', (req, res) => {
  const { id } = req.params;
  Car.findByIdAndRemove(id, (err) => {
    if (err) {
      res.status(500).send('Error deleting car');
    } else {
      res.send('Car deleted successfully');
    }
  });
});