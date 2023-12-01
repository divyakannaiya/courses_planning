const express = require("express");
const createError = require('http-errors');
const http = require('http');
const PORT = 7001
var bodyParser = require('body-parser');
var fs = require("fs");
const app = express();
const cors = require('cors');
const passport = require('passport'); 

//connect to database 
require("./src/models/index")
//import router file
const config = require('./config/config');
const Router = require('./src/router/route');
const morgan = require("morgan");

// parse application/x-www-form-urlencoded      
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());
app.use(morgan("dev"));
app.use('/api', Router);

const server = http.createServer(app);

server.listen(PORT, async () => {
  console.log(`server up on port ${PORT}`)
});

module.exports = app;