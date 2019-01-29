http = require('http');
https = require('https');

//Change when live
const HTTP_PORT = 3000;
const HTTPS_PORT = 3001;

var express = require('express');
var app = express();

var dir = process.cwd();

app.use(express.static(dir));
app.use(express.static(__dirname));

const routes = require('./routes.js');
routes(app);

http.createServer(app).listen(HTTP_PORT, function() {
	console.log('Server is bound to port: ', HTTP_PORT);
});

https.createServer(app).listen(HTTPS_PORT, function() {
	console.log('Server is bound to port: ', HTTPS_PORT);
});