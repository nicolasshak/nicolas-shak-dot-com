var express = require('express');
var app = express();

var dir = process.cwd();

app.use(express.static(dir));
app.use(express.static(__dirname));

const routes = require('./routes.js');
routes(app);

var port = 3000;
app.listen(port, function() {
	console.log('Server is bound to port: ' + port);
})