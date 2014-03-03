var request = require('superagent');
var promise = require('es6-promise');
var fs = require('fs');

function get(conf) {
    console.log('\n### get: ', conf);
    return new promise.Promise(function (resolve, reject) {


        console.log(
            "\n### executing rest call to: \n\n\t'%s'", conf.urlName);

        function onErr(err) {
            console.log('\n### handling onError()');
            reject({
                err: JSON.stringify(err),
                urlName: (conf.urlName) ? conf.urlName : null,
                urlValue: (conf.urlValue) ? conf.urlValue : null
            });
        }

        function onEnd(err, res) {
            debugger;

            if (/^5/.test(res.statusCode)) reject({
                err: res.error,
                urlName: (conf.urlName) ? conf.urlName : null,
                urlValue: (conf.urlValue) ? conf.urlValue : null
            });

            if (res) resolve({
                res: res,
                urlName: conf.urlName,
                urlValue: conf.urlValue
            });
            if (err) reject({
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

/**
 * Gets contents of a static file.
 * @param  {[string]} path [Path to file.]
 * @param  {[object]} opts [Optional options object.
 * If this object has a property named 'encoding' and its 'utf8',
 * the return type is a string. If opts is not passed,
 * then a buffer is returned.]
 * @return {[string || buffer]}      [description]
 */
function getStatic(path, opts) {
    return (opts) ? fs.readFileSync(path, opts) : fs.readFileSync(path);
}
module.exports = {

    get: get,
    getStatic: getStatic
};