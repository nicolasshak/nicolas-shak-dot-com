const fileBrowser = require('./fileBrowser.js');

module.exports = function(app) {

	app.use('*', function(req, res, next) {
		console.log('request from: ', req.url);
		next();
	});

	app.get('/', function(req, res) {
		res.sendFile(__dirname + '/explorer.html');
	});

	app.get('/browse', function(req, res) {
		fileBrowser.getFilesIn(req, res);
	});

	app.get('/open', function(req, res) {
		fileBrowser.open(req, res);
	})
}

