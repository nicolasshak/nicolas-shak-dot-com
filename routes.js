const fileBrowser = require('./fileBrowser.js');
const path = require('path');
const fs = require('fs');

module.exports = function(app) {

	/*
	app.use('/C:/*', function(req, res, next) {
		console.log('Request from:', req.originalUrl);
		next();
	});
	*/

	app.get('/C:/*', function(req, res) {
		res.sendFile(path.join(__dirname, 'index.html'));
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