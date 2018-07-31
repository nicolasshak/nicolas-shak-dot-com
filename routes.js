

module.exports = function(app) {

	app.get('/test', function(req, res) {
		res.send('helloworld');
	})

	app.get('/', function(req, res) {
		res.sendFile('explorer.html');
	})
}