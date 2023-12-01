const mongoose = require('mongoose')
const CONFIG = require('../../config/config')
let model = {};

if(CONFIG.db_uri != null) {
    mongoose.Promise = global.Promise;
    mongoose.connect(CONFIG.db_uri, {
        useNewUrlParser: true
    }).catch((err) => {
        console.log(`cannot connect to mongo db`)
    });

    let db = mongoose.connection;
 
    db.once('open', () => {
        console.log(`Connected to database successfully`)
    })

    db.on('error', (error) => {
        console.log(error)
    })
} else {
    console.log(`No database connectivity string found`)
}

module.exports = model;

