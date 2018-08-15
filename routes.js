const path = require('path');
const fs = require('fs');

module.exports = function(app) {

	app.set('views', __dirname + '/views');
	app.set('view engine', 'ejs');

	app.get('/test', function(req, res) {

		var html = '';

		fs.readdir(__dirname, function(err, files) {
			files.forEach(function(file) {
				fs.stat(__dirname + '/' + file, function(err, stats) {
					if (err) throw err;
					else {
						res.render('file', {file_name: file, date: stats.ctime, size: stats.size, filetype: 'Text'});
					}
				});
			});
		});
	});

	app.get('/', function(req, res) {
		res.sendFile(path.join(__dirname + '/explorer.html'));
	});
}
