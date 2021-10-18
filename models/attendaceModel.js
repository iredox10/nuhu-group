const mongoose = require('mongoose')

const attendanceSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    date: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    course: {
        type: String,
        required: true
    },
    createAt : {
        type:Date,
        default : Date.now()
    }
})


const attendance = mongoose.model('attendance', attendanceSchema);

module.exports = attendance
