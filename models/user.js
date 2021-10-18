const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    booking: {
        type: Array,
    },
    start_date: {
        type: Date,
    },
    end_date: {
        type: Date,
    }
})

module.exports = mongoose.model('User', UserSchema)