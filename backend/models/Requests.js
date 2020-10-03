const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        max: 255,
        min: 6
    },
    email:{
        type: String,
        required: true,
        max: 255,
        min:6
    },
    bookId:{
        type: String,
        required: true,
        max: 255,
        min: 6
    },
    request: {
        type: String,
        required: true,
        max: 255,
        min: 6
    },
    status:{
        type: String,
        max: 255, 
        min: 6
    },
    bookName:{
        type: String,
        required: true,
        max: 255,
        min: 3
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Request', requestSchema);