// server.js

// set up ========================
var express = require('express');
var app = express();
// var get = require('./funcs').get;


// configuration =================

app.configure(function() {
	app.use(express.static(__dirname + '/app')); // set the static files location /public/img will be /img for users
	app.use(express.logger('dev')); // log every request to the console
	app.use(express.bodyParser()); // pull information from html in POST
	app.use(express.methodOverride()); // simulate DELETE and PUT
});


app.get('wayne', function(req, res) {
	console.log('\n### get /api/products/ req: ', req);
	// get({
	// 	urlName: 'getProducts',
	// 	urlValue: 'http://homework.powerdms.com/products/'
	// }).then(function prokResult(response) {
	// 	console.log('\n### response: ', response);
	// 	// // if there is an error retrieving, send the error. nothing after res.send(err) will execute
	// 	// if (err)
	// 	// 	res.send(err)

	// 	// res.json(todos); // return all todos in JSON format
	// });

});

// application -------------------------------------------------------------
app.get('*', function(req, res) {
	res.sendfile('./app/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});


// listen (start app with node server.js) ======================================
app.listen(8080);
console.log("App listening on port 8080");