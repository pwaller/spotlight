/* Setup file run before spec files to setup the context (and RequireJS
 * specifically) to execute the spec file.
 *
 * Defined by caller:
 * - Jasmine predefines
 * - require (Node require)
 * - __dirname, __filename
 * - baseUrl (Relative path to the directory containing this file)
 * - csPath (Path to require-cs module)
 *
 * See requirejs-runner source for full invocation details.
 */
var define,
    requirejsOrig = require('requirejs'),
    ostring = Object.prototype.toString,
    path = require('path'),
    baseUrl,
    isArray = function (it) {
      return ostring.call(it) === '[object Array]';
    },
    requirejs = function (deps, callback) {
      var retVal;

      if (!isArray(deps) && typeof deps !== 'string') {
        if (isArray(callback)) {
          retVal = requirejsOrig(deps, callback, arguments[2]);
        } else {
          retVal = requirejsOrig(deps, [], callback);
        }
      } else {
        retVal = requirejsOrig(deps, callback);
      }

      return retVal;
    };


requirejsOrig.config({
  baseUrl: path.join(process.env.PWD, 'app'),
  nodeRequire: require
});

requirejsOrig.config(requirejs('config'));
var backbone = require('backbone');
backbone.$ = require('jquery');

global._ = require('lodash');

for (var key in requirejsOrig) {
  requirejs[key] = requirejsOrig[key];
}

requirejs.config = function (config) {
  var alteredConfig = {};

  for (var key in config) {
    alteredConfig[key] = config[key];
  }

  if (alteredConfig.baseUrl) {
    var base = baseUrl.replace(/\\/g, '/'),
        splitUrl = alteredConfig.baseUrl.replace(/\\/g, '/').split('/'),
        index = 0;

    for (index = 0; index < splitUrl.length; index++) {
      if (splitUrl[index] === '..') {
        base = path.dirname(base);
      } else {
        base += '/' + splitUrl[index];
      }
    }

    alteredConfig.baseUrl = base;
  }

  return requirejsOrig.config(alteredConfig);
};

require = requirejs;
define = requirejs;
