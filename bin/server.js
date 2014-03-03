'use strict';
// server.js

// set up ========================
var express = require('express');
var app = express();
var get = require('../lib/funcs').get;

var port = 3030;
// listen (start app with node server.js) ======================================
app.listen(port);
console.log("App listening on port: ", port);

// configuration =================

app.configure(function() {
    app.use(express.static(__dirname + '/app')); // set the static files location /public/img will be /img for users
    app.use(express.logger('dev')); // log every request to the console
    app.use(express.bodyParser()); // pull information from html in POST
    app.use(express.methodOverride()); // simulate DELETE and PUT
});




app.get('/api/products', function(req, res) {
    // console.log('\n### get /api/products/ req: ', req);

    get({
        urlName: 'getProducts',
        urlValue: 'http://homework.powerdms.com/products/'
    }).then(function prokResult(response) {
        console.log('\n### cross site req arr length: ', response.res.body.length);

        var statusCode = response.res.statusCode;

        if (statusCode !== 200) {
            console.warn('\n### Status Code of get request not 200, falling back to static data');

            res.json('../data/products.json');
        }
        // // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        // if (err)
        // 	res.send(err)

        res.json(response.res.body); // return all todos in JSON format
    });
    // res.type('text/plain'); // set content-type
    // res.send('i am /api/products'); // send text response

});

// application -------------------------------------------------------------
// app.get('/store', function(req, res) {
// 	res.sendfile('./app/index.html'); // load the single view file (angular will handle the page changes on the front-end)
// });