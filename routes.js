module.exports = function(app) {

	app.get('/', function(req, res) {
		console.log('redirecting');
		res.redirect('explorer.html'); 
	});

	app.get('*', function(req, res) {
		console.log(req);
		res.send('hello guys');
	});
}

