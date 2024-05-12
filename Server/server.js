const express = require("express");
const mongoose = require("mongoose");
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


  module.exports = app;