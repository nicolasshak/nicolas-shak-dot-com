const path = require('path');

module.exports = function(app) {

	app.set('views', __dirname + '/views');
	app.set('view engine', 'ejs');

	app.get('/test', function(req, res) {
		res.render('file', {});
	});

	app.get('/', function(req, res) {
		res.sendFile(path.join(__dirname + '/explorer.html'));
	});
}
