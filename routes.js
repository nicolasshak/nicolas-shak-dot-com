const path = require('path');

module.exports = function(app) {

	app.get('/test', function(req, res) {
		res.send('helloworld');
	});

	app.get('/', function(req, res) {
		res.sendFile(path.join(__dirname + '/explorer.html'));
	});
}
