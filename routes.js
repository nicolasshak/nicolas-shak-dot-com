const fileBrowser = require('./fileBrowser.js');
const path = require('path');
const fs = require('fs');

module.exports = function(app) {

	app.use('*', function(req, res, next) {
		console.log('request from: ', req.url);
		next();
	});

	app.get('/', function(req, res) {
		res.sendFile(path.join(__dirname, 'explorer.html'));
	});

	app.get('/browse', function(req, res) {
		fileBrowser.getFilesIn(req, res);
	});

	app.get('/open', function(req, res) {
		fileBrowser.open(req.query.path, res);
	});

	app.get('/get', function(req, res) {
		fileBrowser.open(path.join(__dirname, req.query.path), res);
	})
}