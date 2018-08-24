const path = require('path');
const fs = require('fs');
const ejs = require('ejs');

module.exports = function(app) {

	app.set('views', __dirname + '/views');
	app.set('view engine', 'ejs');

	app.get('/test', function(req, res) {
		fs.readdir(__dirname, function(err, files) {
			if(err) throw err;
			else {

				res.setHeader('Content-Type', 'text/html');

				var template = fs.readFileSync(__dirname + '/views/file.ejs', 'ascii');
				var i = 0;

				files.forEach(function(file) {
					fs.stat(__dirname + '/' + file, function(err, stats) {
						if (err) throw err;
						else {
							res.write(ejs.render(template, {file_name: file, date: stats.ctime, size: stats.size, filetype: 'Text'}));
						}

						if(i == files.length - 1) {
							res.end();
						}
						else {
							i++;
						}
					});
				});
			}
		});
	});

	app.get('/', function(req, res) {
		res.sendFile(path.join(__dirname + '/explorer.html'));
	});
}
