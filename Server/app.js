const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/api/sample", require("./routes/sample"));
app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/student", require("./routes/studentRoutes"));
app.use("/api/lecturer", require("./routes/lecturerRoutes"));
app.use('/api/problems',require('./routes/problemRoutes'))
app.use('/api/contest',require('./routes/contestRoutes'))
app.use('/api/submission',require('./routes/submissionRoutes'))




  module.exports = app;