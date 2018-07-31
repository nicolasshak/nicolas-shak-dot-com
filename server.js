var http = require('http');
const path = require('path');
var express = require('express');

var app = express();

app.use(express.static(__dirname + '/public'));

const routes = require('./routes.js');
routes(app);

app.listen(3000, function() {
    console.log('Server is bound to port 3000');
});