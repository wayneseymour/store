var request = require('superagent');
var promise = require('es6-promise');

function get(conf) {
	console.log('\n### get: ', conf);
	return new promise.Promise(function(resolve) {


		console.log(
			"\n### executing rest call to: \n\n\t'%s'", conf.urlName);

		function onErr(err) {
			console.log('\n### handling onError()');
			resolve({
				err: JSON.stringify(err),
				urlName: (conf.urlName) ? conf.urlName : null,
				urlValue: (conf.urlValue) ? conf.urlValue : null
			});
		}

		function onEnd(err, res) {
			if (res) resolve({
				res: res,
				urlName: conf.urlName,
				urlValue: conf.urlValue
			});
			if (err) resolve({
				err: JSON.stringify(err),
				urlName: (conf.urlName) ? conf.urlName : null,
				urlValue: (conf.urlValue) ? conf.urlValue : null
			});
		}

		request
			.get(conf.urlValue)
			.on('error', function runOnErr(err) {
				onErr(err);
			})
			.end(function runOnEnd(err, res) {
				onEnd(err, res);
			});


	});
}

module.exports = {

	get: get
};