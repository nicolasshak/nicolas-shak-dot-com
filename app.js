const PORT = 3000;

var express = require('express');
var app = express();

var dir = process.cwd();

app.use(express.static(dir));
app.use(express.static(__dirname));

const routes = require('./routes.js');
routes(app);

app.listen(PORT, function() {
	console.log('Server is bound to port: ', PORT);
})