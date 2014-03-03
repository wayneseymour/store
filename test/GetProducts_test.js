'use strict';

var get = require('../lib/funcs').get;
var getStatic = require('../lib/funcs').getStatic;


module.exports = {

    setUp: function(callback) {
        callback();
    },

    tearDown: function(callback) {
        callback();
    },

    testGetRemoteProducts: function(test) {
        debugger;
        get({
            urlName: 'getProducts',
            urlValue: 'http://homework.powerdms.com/products/'
        }).
        then(function(response) {
            var statusCode = response.res.statusCode;
            console.log('\n### response.res.statusCode: ',
                statusCode);

            test.equal(statusCode, 200,
                'getProducts call stat code not 200');
            test.done();
        });
    },

    testGetStaticProducts: function(test) {
        debugger;

        var expected = 'Viktor E. Frankl';

        var actual = getStatic(__dirname + '/../data/products.json', {
            encoding: 'utf8'
        });


        test.ok(actual.indexOf(expected) !== -1, 'actual should contain expected');

        test.done();

    }
};