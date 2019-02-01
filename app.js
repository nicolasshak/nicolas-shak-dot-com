http = require('http');

const HTTP_PORT = 3000;

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