const express = require("express");
const mongoose = require("mongoose");
const path  = require('path')
require("dotenv").config();



const app = require("./app")



mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(process.env.PORT, () => {
      console.log("Server is running on port " + process.env.PORT);
    });
  })
  .catch((err) => console.log(err));


  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../Client/dist')));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../Client/dist', 'index.html'));
    });
}

  module.exports = app;