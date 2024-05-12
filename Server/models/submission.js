const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
    problemId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    // userId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     required: true
    // },
    code: {
        type: String,
        required: true
    },
    language: {
        type: String,
        required: true
    },

    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    // status: {
    //     type: String,
    //     required: true
    // },
    // testCases: {
    //     type: [
    //         {
    //             input: {
    //                 type: String
    //             },
    //             expectedOutput: {
    //                 type: String
    //             },
    //             output: {
    //                 type: String
    //             },
    //             status: {
    //                 type: String
    //             }
    //         }
    //     ],
    //     default: []
    // },
    grade: {
        type: Number
    }
});

module.exports = mongoose.model('Submission', submissionSchema);