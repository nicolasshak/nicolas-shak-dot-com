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

				var fileTemplate = fs.readFileSync(__dirname + '/views/file.ejs', 'ascii');
				var folderTemplate = fs.readFileSync(__dirname + '/views/folder.ejs', 'ascii');
				var i = 0;

				files.forEach(function(file) {
					fs.stat(__dirname + '/' + file, function(err, stats) {
						if (err) throw err;
						else {
							res.write(ejs.render(fileTemplate, {
								file_name: file,
								date: parseDate(stats.ctime),
								size: getFileSize(stats.size),
								filetype: getFileType(file)}));
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

function parseDate(date) {
	var tok = (date + '').split(' ');
	var final = '';
	for(var i = 0; i < 4; i++) {
		final += tok[i];
		if(i == 2)
			final += ',';
		final += ' ';
	}
	return final;
}

function getFileSize(fileSize) {
	if(fileSize == 0) {
		return '--';
	}
	return Math.ceil(fileSize/1000) + ' KB';
}

function getFileType(fileName) {
	var ext = path.extname(fileName);
	switch(ext) {
		case '':
			return 'Folder';
		case '.txt':
			return 'Text';
		default:
			var newName = ext.substring(1, fileName.length);
			newName = newName.substring(0, 1).toUpperCase() + newName.slice(1);
			return newName + ' File';
	}
}
