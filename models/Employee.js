const mongoose = require('mongoose');

const employeeSchema = mongoose.Schema({
    empName: {
        type: String,
        required: true
    },
    empAge: {
        type: Number,
        required: false
    },
    empAddress: {
        type: String,
        required: false
    },
    empPhone: {
        type: Number,
        required: true
    }
});

console.log('model is running');

module.exports = mongoose.model('employees', employeeSchema);