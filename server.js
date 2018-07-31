var http = require('http');
var express = require('express');

var app = express();

const routes = require('./routes.js');
routes(app);

app.listen(3000, function() {
    console.log('Server is bound to port 3000r')
});