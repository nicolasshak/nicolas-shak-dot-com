const path = require('path');
const fs = require('fs');

module.exports = function(app) {

	app.set('views', __dirname + '/views');
	app.set('view engine', 'ejs');

	app.get('/test', function(req, res) {
		var names = fs.readdir(__dirname, function(err, files) {
			files.forEach(file => {
				console.log(file);
				fs.stat(__dirname + '/' + file, function(err, stats) {
					if (err) throw err;
					else {
						console.log('size: ' + stats.size);
					}
				});
			});
		});
		res.render('file', {file_name: 'helloworld.txt', date: 'June 27, 2018', size: '15 KB', filetype: 'Text'});
	});

	app.get('/', function(req, res) {
		res.sendFile(path.join(__dirname + '/explorer.html'));
	});
}
