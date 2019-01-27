const fs = require('fs');
const path = require('path');

exports.getFilesIn = function(req, res) {

	//substring removes the /C:
	dir = __dirname + req.query.path.substring(2, req.url.length);

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
					date: simplifyDate(stats.ctime),
					type: getFileType(path.extname(file)),
					size: simplifyBytes(stats.size),
					ext: path.extname(file),
					isDirectory: stats.isDirectory(),
					path: path.join(dir, file),
					parent: req.query.path
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

getFileType = function(ext) {

	if(ext == '') {
		return 'folder'
	}
	else {
		return ext;
	}
}

simplifyBytes = function(bytes) {

	var curr = bytes;
	var level = 0;

	while(curr > 1000) {
		curr = curr/1000;
		level++;
	}

	var size = '';

	switch(level) {
		case 0:
			size = ' B';
			break;
		case 1:
			size = ' KB';
			break;
		case 2:
			size = ' MB';
			break;
		case 3:
			size = ' GB';
			break;
		default:
			return 'BIG';
	}

	return parseInt(curr, 10) + size;
}

simplifyDate = function(timestamp) {
	date = Date(timestamp);
	return date.replace(' GMT-0800 (PST)', '');
}