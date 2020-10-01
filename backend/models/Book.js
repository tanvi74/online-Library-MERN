const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        max: 255,
        min: 2
    },
    isbn:{
        type: String,
        max: 1024,
        min: 6
    },
    pageCount:{
        type: Number,
        max: 1024,
        min: 6
    },
    publishedDate:{
        type: String,
        max: 1024,
        min: 6
    },
    thumbnailURl:{
        type: String,
        required: true,
        max: 1024,
        min: 6
    },
    shortDescription:{
        type: String,
        max: 1024,
        min: 6
    },
    longDescription:{
        type: String,
        max: 1024,
        min: 6
    },
    status:{
        type: String,
        max: 1024,
        min: 6
    },
    authors:{
        type: String,
        max: 1024,
        min: 6
    },
    categories:{
        type: String,
        max: 1024,
        min: 6
    },
    quantity:{
        type: Number,
        max:1024,
        min: 1
    },
    price:{
        type: Number,
        max:1024,
        min: 1
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Book', bookSchema);