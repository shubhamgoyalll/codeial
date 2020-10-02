// use npm install mongoose to work

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/codeial_development');

const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error connection in MongoDb"));

db.once('open', function(){
    console.log('Connected to databse :: MOngoDb');
});

module.exports = db;