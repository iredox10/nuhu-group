const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required : true
    },
    surName: {
        type: String,
        required : true
    },
    email: {
        type: String,
        required : true,
        unique: true
    },
    address: {
        type: String,
        required : true
    },
    staffNumber: {
        type: String,
        required : true,
        unique: true
    },
    department: {
        type: String,
        required : true
    },
    password: {
        type: String,
        required : true
    }
})

const staffModel = mongoose.model('staffModel', staffSchema)

module.exports = staffModel;    