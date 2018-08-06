const path = require('path');

module.exports = function(app) {

	app.set('views', __dirname + '/views');
	app.set('view engine', 'ejs');

	app.get('/test', function(req, res) {
		res.render('file', {file_name: 'helloworld.txt', date: 'June 27, 2018', size: '15 KB', filetype: 'Text'});
	});

	app.get('/', function(req, res) {
		res.sendFile(path.join(__dirname + '/explorer.html'));
	});
}
