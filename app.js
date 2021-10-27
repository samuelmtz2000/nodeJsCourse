const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');

require('dotenv/config');
const api = process.env.API_URL;

//middleware
app.use(express.json());
app.use(morgan('tiny'));

//
const productSchema = mongoose.Schema({
  name: String,
  image: String,
  countInStock: { type: Number, require: true },
});

const Product = mongoose.model('Product', productSchema);

// api/v1/
app.get('/', (req, res) => {
  res.send('hello api');
});

//#region Products
app.get(`${api}/products`, (req, res) => {
  const product = {
    id: 1,
    name: 'hair dresser',
    img: 'some url',
  };
  res.send(product);
});
app.post(`${api}/products`, (req, res) => {
  const product = new Product({
    name: req.body.name,
    image: req.body.img,
    countInStock: req.body.countInStock,
  });
  product
    .save()
    .then((createdProduct) => {
      res.status(201).json(createdProduct);
    })
    .catch((err) => {
      res.status(500, {
        error: err,
        succes: false,
      });
    });
});
//#endregion

mongoose
  .connect(process.env.CONNECTION_STRING)
  .then(() => {
    console.log('Database connection Ready');
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
