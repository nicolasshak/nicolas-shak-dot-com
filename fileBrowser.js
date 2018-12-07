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
				var stats = fs.statSync(path.join(dir, file));
				data.push({
					name: file,
					date: stats.ctime,
					ext: path.extname(file),
					size: stats.size,
					isDirectory: stats.isDirectory(),
					path: path.join(dir, file),
					parent: req.url
				});
			} catch(e) {
				console.log(e);
			}
		});

		res.json(data);
	});
}

exports.open = function(path, res) {
	fs.readFile(path, 'utf8', function(err, contents) {
		if(err) {
			throw err;
		}
		else {
			res.send(contents);
			return;
		}
	});
}