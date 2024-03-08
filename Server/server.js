const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');


const app = express();
app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
    console.log(req.path,req.method)
    next();
}
);



app.use('/api/sample', require('./routes/sample'));
app.use('/api/user', require('./routes/userRoutes'));

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(process.env.PORT, () => {
            console.log('Server is running on port ' + process.env.PORT);
        });
        

    })
    .catch(err => console.log(err));






