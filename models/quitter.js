const mongoose = require('mongoose');

const quit_counts = new mongoose.Schema({
    date: {
        type: Date,
    },
    count: {
        type: String,
    },
    dateString:{
        type: String
    }
}, {collection : 'quit_counts'});

module.exports = quitter = mongoose.model('quit_counts', quit_counts);