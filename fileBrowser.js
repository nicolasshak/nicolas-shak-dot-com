const fs = require('fs');
const path = require('path');

exports.getFilesIn = function(req, res) {

	//substring removes the /C:
	dir = __dirname + req.query.path.substring(3, req.url.length);

	console.log('browsing', req.query.path);
	fs.readdir(dir, function(err, files) {
		if(err) {
			res.send('Sorry, couldn\'t find that file!');
			return;
		}

		var data = [];

		files.forEach(function(file) {
			try {
				var isDirectory = fs.statSync(path.join(dir, file)).isDirectory();
				if(isDirectory) {
					data.push({
						Name: file,
						IsDirectory: true,
						Path: path.join(dir, file),
						Parent: req.url
					})
				}
				else {
					data.push({
						Name: file,
						Ext: path.extname(file),
						IsDirectory: false,
						Path: path.join(dir, file),
						Parent: req.url
					});
				}
			} catch(e) {
				console.log(e);
			}
		});

		res.json(data);
	});
}

exports.open = function(req, res) {
	fs.readFile(req.query.path, 'utf8', function(err, contents) {
		if(err) {
			throw err;
		}
		else {
			res.send(contents);
			return;
		}
	});
}