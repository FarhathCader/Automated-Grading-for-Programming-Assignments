const mongoose = require('mongoose');

const lecturerSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    department: {
        type: String,
        
    },
    email: {
        type: String,
        required: true,
        unique: true
    }
},  {timestamps: true}
);

module.exports = mongoose.model('Lecturer', lecturerSchema);